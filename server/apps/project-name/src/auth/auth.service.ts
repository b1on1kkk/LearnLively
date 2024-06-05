import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '@prismaORM/prisma';

import { SharedService } from '@sharedService/shared';
import { randomIntFromInterval } from './utils/randomIntFromInterval';

import { AuthMailer } from 'libs/auth_mailer/mailer';

import AVATAR_NAMES from './constants/avatarNames';

import type { Request } from 'express';

import type { SignUpDTO } from './dto/signup_payload.dto';
import type { LoginPayloadDTO } from './dto/login_payload.dto';

import type { verifyDecodedData } from './interfaces/verifyDecodedData';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly sharedService: SharedService,
  ) {}

  async login(payload: LoginPayloadDTO, req: Request) {
    const user = await this.prisma.users.findFirst({
      where: { email: payload.email },
      select: {
        id: true,
        password: true,
        auth_status: true,
      },
    });

    // check if authentication status is not true to send user error
    if (!user.auth_status) {
      throw new HttpException(
        'Verify your account by link that was send to your email!',
        HttpStatus.BAD_REQUEST,
      );
    }

    // check if this user is exist
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    const passwordMatch = await bcrypt.compare(payload.password, user.password);

    if (!passwordMatch) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    // if user exist, generate tokens
    const { access_token, refresh_token } = this.sharedService.tokensGenerator(
      user.id,
    );

    try {
      const device_id: string = req.headers['x-header-device_id'] as string;

      if (device_id) {
        // update token data
        await this.prisma.refresh_token_metadata.updateMany({
          where: {
            user_id: user.id,
            device_id: device_id,
          },
          data: {
            ip: req.ip,
            device: req.headers['user-agent'],
            issuedAt: this.sharedService.decodeToken(refresh_token).iat,
          },
        });

        return {
          device_id: device_id,
          tokens: {
            access: access_token,
            refresh: refresh_token,
          },
        };
      } else {
        const device_id = uuidv4();

        await this.prisma.refresh_token_metadata.create({
          data: {
            user_id: user.id,
            ip: req.ip,
            device: req.headers['user-agent'],
            issuedAt: this.sharedService.decodeToken(refresh_token).iat,
            device_id: device_id,
          },
        });

        return {
          device_id: device_id,
          tokens: {
            access: access_token,
            refresh: refresh_token,
          },
        };
      }
    } catch (error) {
      throw new HttpException('Login error occured', HttpStatus.BAD_GATEWAY);
    }
  }

  async signup(authPayload: SignUpDTO) {
    try {
      // if this email is already exist - prisma will throw error
      const { id: user_id } = await this.prisma.users.create({
        data: {
          name: authPayload.name,
          lastname: authPayload.lastname,
          surname: authPayload.surname,
          role: 'student',
          email: authPayload.email,
          end_semester: 4,
          now_semester: 1,
          department: 'Test D.',
          password: await bcrypt.hash(authPayload.password, 10),
          img_hash_name:
            AVATAR_NAMES[randomIntFromInterval(0, AVATAR_NAMES.length - 1)],
          created_at: new Date(),
          auth_status: false,
        },
        select: {
          id: true,
        },
      });

      // generate unique device id
      const device_id: string = uuidv4();

      // values that will stored in verify jwt
      const credentials = {
        user_id: user_id,
        device_id: device_id,
        to: authPayload.email,
      };

      // send email with token and data in it
      const mailer = new AuthMailer(this.jwtService, credentials);
      mailer.sendAuthMail();

      return {
        device_id: device_id,
      };
    } catch (error) {
      throw new HttpException(
        'User with this credentials is exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async logout(req: Request) {
    const device_id = req.headers['x-header-device_id'] as string;

    if (device_id) {
      try {
        const res = await this.prisma.refresh_token_metadata.deleteMany({
          where: {
            device_id: device_id,
          },
        });

        if (res.count === 0) {
          throw new HttpException(
            'You have already logged out!',
            HttpStatus.BAD_REQUEST,
          );
        }

        return { text: 'Logged out!', status: 200 };
      } catch (error) {
        throw new HttpException('Error while leaving', HttpStatus.BAD_GATEWAY);
      }
    }

    throw new HttpException(
      'There is nothing to delete!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async verify(token: string | undefined, req: Request) {
    try {
      this.jwtService.verify(token, {
        secret: process.env.JWT_AUTH_MAIL_TOKEN,
      });

      const decoded: verifyDecodedData = this.jwtService.decode(token);

      const user = await this.prisma.users.findUnique({
        where: { id: decoded.user_id },
      });

      if (!user || user.auth_status) {
        throw new HttpException(
          'User is not found or already authenticated!',
          HttpStatus.UNAUTHORIZED,
        );
      }

      await this.prisma.users.update({
        where: { id: user.id },
        data: { auth_status: true },
      });

      // generate tokens
      const { access_token, refresh_token } =
        this.sharedService.tokensGenerator(user.id);

      // insert data about refresh token
      await this.prisma.refresh_token_metadata.create({
        data: {
          ip: req.ip,
          user_id: user.id,
          device_id: decoded.device_id,
          device: req.headers['user-agent'],
          issuedAt: this.sharedService.decodeToken(refresh_token).iat,
        },
      });

      return {
        message: 'Account verified! Return back to the page and refresh it.',
        status: true,
        tokens: {
          access: access_token,
          refresh: refresh_token,
        },
      };
    } catch (error) {
      console.log(error);

      return {
        message: 'Authentication error occured',
        status: false,
        tokens: null,
      };
    }
  }
}

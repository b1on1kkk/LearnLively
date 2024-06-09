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
import type { AuthMailerDTO } from './dto/authMailer.dto';
import type { LoginPayloadDTO } from './dto/login_payload.dto';

import type { verifyDecodedData } from './interfaces/verifyDecodedData';
import type { GoogleAuthUserPayload } from './interfaces/googleAuthUserPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly sharedService: SharedService,
  ) {}

  /////////////////////////////////////GOOGLE AUTH/////////////////////////////////////////

  async googleLogin(req: Request, login_user: GoogleAuthUserPayload) {
    // get user data
    const user = await this.prisma.users.findFirst({
      where: { email: login_user.email },
      select: { id: true, external_status: true },
    });

    if (user && user.external_status === 'OPEN_ID') {
      throw new HttpException(
        'Credentials are not correct!',
        HttpStatus.BAD_GATEWAY,
      );
    }

    // check if this user is exist
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    // if user exist, generate tokens
    const { access_token, refresh_token } = this.sharedService.tokensGenerator(
      user.id,
    );

    const device_id: string = uuidv4();

    try {
      await this.prisma.refresh_token_metadata.create({
        data: {
          user_id: user.id,
          ip: req.ip,
          device: req.headers['user-agent'],
          issuedAt: this.sharedService.decodeToken(refresh_token).iat,
          device_id: device_id,
        },
      });
    } catch (error) {
      throw new HttpException('Login error occured', HttpStatus.BAD_GATEWAY);
    }

    return {
      tokens: {
        access: access_token,
        refresh: refresh_token,
      },
    };
  }

  async googleSignup(req: Request, signup_user: GoogleAuthUserPayload) {
    try {
      const { id: user_id } = await this.prisma.users.create({
        data: {
          name: signup_user.firstName,
          lastname: signup_user.lastName,
          surname: '',
          role: 'student',
          email: signup_user.email,
          end_semester: 4,
          now_semester: 1,
          department: 'Test D.',
          password: null,
          img_hash_name: signup_user.picture,
          created_at: new Date(),
          auth_status: true,
          external_status: 'GOOGLE',
        },
        select: {
          id: true,
        },
      });

      // generate tokens
      const { access_token, refresh_token } =
        this.sharedService.tokensGenerator(user_id);

      // generate unique device id
      const device_id: string = uuidv4();

      try {
        await this.prisma.refresh_token_metadata.create({
          data: {
            user_id: user_id,
            ip: req.ip,
            device: req.headers['user-agent'],
            issuedAt: this.sharedService.decodeToken(refresh_token).iat,
            device_id: device_id,
          },
        });
      } catch (error) {
        throw new HttpException(
          'Sign up error occured',
          HttpStatus.BAD_GATEWAY,
        );
      }

      return {
        tokens: {
          access: access_token,
          refresh: refresh_token,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new HttpException(
        'Error happened while signing up',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /////////////////////////////////////GOOGLE AUTH/////////////////////////////////////////

  /////////////////////////////////////BASIC AUTH//////////////////////////////////////////

  async login(payload: LoginPayloadDTO, req: Request) {
    try {
      const user = await this.prisma.users.findFirst({
        where: { email: payload.email },
        select: {
          id: true,
          password: true,
          auth_status: true,
        },
      });

      // check if this user is exist
      if (!user)
        throw new HttpException(
          'User not found or exist!',
          HttpStatus.NOT_FOUND,
        );

      // check if authentication status is not true to send user error
      if (!user.auth_status) {
        throw new HttpException(
          'This account is not verified!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const passwordMatch = await bcrypt.compare(
        payload.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new HttpException(
          'User not found or exist!',
          HttpStatus.NOT_FOUND,
        );
      }

      // if user exist, generate tokens
      const { access_token, refresh_token } =
        this.sharedService.tokensGenerator(user.id);

      // generate device_id
      const device_id: string = uuidv4();

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
      } else {
        await this.prisma.refresh_token_metadata.create({
          data: {
            user_id: user.id,
            ip: req.ip,
            device: req.headers['user-agent'],
            issuedAt: this.sharedService.decodeToken(refresh_token).iat,
            device_id: device_id,
          },
        });
      }

      if (JSON.parse(payload.remember_me) === true) {
        return {
          tokens: {
            access: access_token,
            refresh: refresh_token,
          },
        };
      }

      return {
        tokens: {
          access: access_token,
          refresh: null,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

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
          external_status: 'OPEN_ID',
        },
        select: {
          id: true,
        },
      });

      // generate unique device id
      const device_id: string = uuidv4();

      // values that will stored in verify jwt
      const credentials: AuthMailerDTO = {
        user_id: user_id,
        device_id: device_id,
        to: authPayload.email,
        remember_me: authPayload.remember_me,
      };

      // send email with token and data in it
      const mailer = new AuthMailer(this.jwtService, credentials);
      mailer.sendAuthMail();
    } catch (error) {
      throw new HttpException(
        'User with this credentials is exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /////////////////////////////////////BASIC AUTH//////////////////////////////////////////

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
          refresh: JSON.parse(decoded.remember_me) ? refresh_token : null,
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

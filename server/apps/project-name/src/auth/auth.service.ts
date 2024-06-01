import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginPayloadDTO } from './dto/login_payload.dto';

import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { SignUpDTO } from './dto/signup_payload.dto';
import { PrismaService } from '@prismaORM/prisma';

import AVATAR_NAMES from './constants/avatarNames';
import { randomIntFromInterval } from './utils/randomIntFromInterval';
import { SharedService } from '@sharedService/shared';

import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sharedService: SharedService,
  ) {}

  async login(payload: LoginPayloadDTO, req: Request) {
    const user = await this.prisma.users.findFirst({
      where: { email: payload.email },
    });

    // check if this user is exist
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    const passwordMatch = await bcrypt.compare(payload.password, user.password);

    if (!passwordMatch)
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    // if user exist, generate tokens
    const access_token = this.sharedService.tokenGenerator(
      process.env.JWT_ACCESS_TOKEN,
      user.id,
      '1h',
    );
    const refresh_token = this.sharedService.tokenGenerator(
      process.env.JWT_REFRESH_TOKEN,
      user.id,
      '1d',
    );

    const device_id = req.headers['x-header-device_id'] as string;

    try {
      // update token data
      await this.prisma.refresh_token_metadata.updateMany({
        where: {
          device_id,
        },
        data: {
          ip: req.ip,
          device: req.headers['user-agent'],
          issuedAt: this.sharedService.decodeToken(refresh_token).iat,
        },
      });
    } catch (error) {
      throw new HttpException('Updated error occured', HttpStatus.BAD_GATEWAY);
    }

    return {
      device_id: device_id,
      tokens: {
        access: access_token,
        refresh: refresh_token,
      },
    };
  }

  async signup(authPayload: SignUpDTO, req: Request) {
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
        },
        select: {
          id: true,
        },
      });

      // generate unique device id
      const device_id = uuidv4();

      // generate tokens
      const access_token = this.sharedService.tokenGenerator(
        process.env.JWT_ACCESS_TOKEN,
        user_id,
        '1h',
      );
      const refresh_token = this.sharedService.tokenGenerator(
        process.env.JWT_REFRESH_TOKEN,
        user_id,
        '1d',
      );
      //

      // insert data about refresh token
      await this.prisma.refresh_token_metadata.create({
        data: {
          ip: req.ip,
          user_id: user_id,
          device_id: device_id,
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
    } catch (error) {
      throw new HttpException(
        'User with this credentials is exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async logout(cookies: { [key: string]: string } | undefined) {
    if (cookies) {
      const keys = Object.keys(cookies);

      if (keys.includes('jwt_lg')) {
        // const decoded: {
        //   id: number;
        //   iat: number;
        //   exp: number;
        // } = this.jwtService.decode(cookies['jwt_lg']);

        // const res = await this.prisma.refresh_token.deleteMany({
        //   where: {
        //     user_id: decoded.id,
        //   },
        // });

        // if (res.count === 0)
        //   throw new HttpException(
        //     'You have already logged out!',
        //     HttpStatus.BAD_REQUEST,
        //   );

        return { text: 'Logged out!', status: 200 };
      }
    }

    throw new HttpException(
      'There is nothing to delete!',
      HttpStatus.BAD_REQUEST,
    );
  }
}

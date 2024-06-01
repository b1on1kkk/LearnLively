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
      select: {
        id: true,
        password: true,
      },
    });

    // check if this user is exist
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    const passwordMatch = await bcrypt.compare(payload.password, user.password);

    if (!passwordMatch)
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    // if user exist, generate tokens
    const { access_token, refresh_token } = this.sharedService.tokensGenerator(
      user.id,
    );

    try {
      const device_id: string | undefined = req.headers[
        'x-header-device_id'
      ] as string;

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
      throw new HttpException('Updated error occured', HttpStatus.BAD_GATEWAY);
    }
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
      const { access_token, refresh_token } =
        this.sharedService.tokensGenerator(user_id);

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
}

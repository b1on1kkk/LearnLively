import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginPayloadDTO } from './dto/login_payload.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/signup_payload.dto';
import { PrismaService } from '@prismaORM/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginPayloadDTO) {
    const user = await this.prisma.users.findFirst({ where: { email } });

    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    const refresh_token = this.jwtService.sign(
      { id: user.id },
      { secret: process.env.JWT_REFRESH_TOKEN_KEY },
    );

    await this.prisma.refresh_token.create({
      data: {
        user_id: user.id,
        refresh_token: refresh_token,
        created_at: new Date(),
      },
    });

    return this.jwtService.sign(
      { id: user.id },
      { secret: process.env.JWT_SECRET_KEY, expiresIn: '5m' },
    );
  }

  async signup({ name, lastname, surname, email, password }: SignUpDTO) {
    try {
      await this.prisma.users.create({
        data: {
          name: name,
          lastname: lastname,
          surname: surname,
          role: 'student',
          email: email,
          end_semester: 4,
          now_semester: 1,
          department: 'Test D.',
          password: await bcrypt.hash(password, 10),
          img_hash_name: 'no image',
          created_at: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        'User with this credentials is exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.login({ email, password });
  }

  async logout(cookies: { [key: string]: string } | undefined) {
    if (cookies) {
      const keys = Object.keys(cookies);

      if (keys.includes('jwt_lg')) {
        const decoded: {
          id: number;
          iat: number;
          exp: number;
        } = this.jwtService.decode(cookies['jwt_lg']);

        const res = await this.prisma.refresh_token.deleteMany({
          where: {
            user_id: decoded.id,
          },
        });

        if (res.count === 0)
          throw new HttpException(
            'You have already logged out!',
            HttpStatus.BAD_REQUEST,
          );

        return { text: 'Logged out!', status: 200 };
      }
    }

    throw new HttpException(
      'There is nothing to delete!',
      HttpStatus.BAD_REQUEST,
    );
  }
}

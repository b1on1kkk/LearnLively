import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '@prismaORM/prisma';

import type { DecodedData } from 'apps/interfaces/decodedJwtData';

@Injectable()
export class SharedService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  public cookieExp(cookie: string, secret: string) {
    try {
      this.jwtService.verify(cookie, { secret });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async getStudentsByPrisma(id: number) {
    return await this.prisma.users.findMany({
      where: {
        id: {
          not: id,
        },
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        surname: true,
        role: true,
        email: true,
        end_semester: true,
        now_semester: true,
        department: true,
        img_hash_name: true,
        created_at: true,
        friends_friends_friend_idTousers: {
          where: {
            user_id: id,
          },
          select: {
            id: true,
            user_id: true,
            friend_id: true,
            status: true,
          },
        },
        friends_friends_user_idTousers: {
          where: {
            friend_id: id,
          },
          select: {
            id: true,
            user_id: true,
            friend_id: true,
            status: true,
          },
        },
        users_conversations: {
          where: {
            conversations: {
              type: 'private',
            },
          },
          select: {
            conversation_id: true,
            conversations: {
              select: {
                conversation_hash: true,
              },
            },
          },
        },
      },
    });
  }

  public tokensGenerator(user_id: number) {
    const access_token = this.jwtService.sign(
      { user_id },
      {
        secret: process.env.JWT_ACCESS_TOKEN,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXP,
      },
    );
    const refresh_token = this.jwtService.sign(
      { user_id },
      {
        secret: process.env.JWT_REFRESH_TOKEN,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXP,
      },
    );

    return { access_token, refresh_token };
  }

  public decodeToken(token: string): DecodedData {
    return this.jwtService.decode(token);
  }

  public async parceStudentsInf(user_id: number) {
    try {
      return await this.getStudentsByPrisma(user_id);
    } catch (error) {
      throw new HttpException(
        'Something goes wrong while getting :(',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}

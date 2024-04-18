import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@prismaORM/prisma';

import { SharedService } from '@sharedService/shared';

@Injectable()
export class ApiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly sharedService: SharedService,
  ) {}

  async getUser(cookies: { [key: string]: string } | undefined) {
    const keys = Object.keys(cookies);

    try {
      if (keys.length > 0 && keys.includes('jwt_lg')) {
        const decoded: {
          id: number;
          iat: number;
          exp: number;
        } = this.jwtService.decode(cookies['jwt_lg']);

        const refresh_token = await this.prisma.refresh_token.findFirst({
          where: { user_id: decoded.id },
        });

        if (refresh_token) {
          const user = await this.prisma.users.findUnique({
            where: {
              id: decoded.id,
            },
            select: {
              id: true,
              name: true,
              lastname: true,
              email: true,
              surname: true,
              role: true,
              friends_friends_friend_idTousers: {
                // incoming friend requests
                where: {
                  status: 'pending',
                },
                select: {
                  user_id: true,
                  status: true,
                },
              },
              friends_friends_user_idTousers: {
                // outgoing friend requests
                where: {
                  status: 'pending',
                },
                select: {
                  friend_id: true,
                  status: true,
                },
              },
            },
          });

          // if cookie is still alive - do not generate new, just return old alive one
          if (this.sharedService.cookieExpirationChecker(cookies['jwt_lg'])) {
            return {
              user: user,
              token: cookies['jwt_lg'],
            };
          }

          // in other cases - generate new and return new one
          return {
            user: user,
            token: this.jwtService.sign(
              { id: user.id },
              { secret: process.env.JWT_SECRET_KEY, expiresIn: '5m' },
            ),
          };
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  async getStudents(user_id: number) {
    try {
      return await this.prisma.users.findMany({
        where: {
          id: {
            not: user_id,
          },
          role: 'student',
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
        },
      });
    } catch (error) {
      throw new HttpException(
        'Something goes wrong :(',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@prismaORM/prisma';

@Injectable()
export class ApiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
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
          const user = await this.prisma.users.findFirst({
            where: { id: refresh_token.user_id },
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
            },
          });

          return {
            user: user,
            new_token: this.jwtService.sign(
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
    const students = await this.prisma.users.findMany({
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
        _count: {
          select: {
            friends_friends_friend_idTousers: {
              where: {
                user_id: user_id,
              },
            },
            friends_friends_user_idTousers: {
              where: {
                friend_id: user_id,
              },
            },
          },
        },
      },
    });

    const formattedStudents = students.map((student) => ({
      ...student,
      isFriend:
        student._count.friends_friends_friend_idTousers +
          student._count.friends_friends_user_idTousers >
        0,
    }));

    return formattedStudents;
  }
}

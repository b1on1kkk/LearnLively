import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prismaORM/prisma';

@Injectable()
export class SharedService {
  private new_cookie: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    this.new_cookie = '';
  }

  setCookie(cookie: string) {
    this.new_cookie = cookie;
  }

  getCookie() {
    return this.new_cookie;
  }

  cookieExpirationChecker(cookie: string) {
    try {
      this.jwtService.verify(cookie, { secret: process.env.JWT_SECRET_KEY });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getStudentsByPrisma(id: number) {
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
}

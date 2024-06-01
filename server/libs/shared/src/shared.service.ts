import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prismaORM/prisma';

interface DecodedData {
  user_id: number;
  iat: number;
  exp: number;
}

@Injectable()
export class SharedService {
  private new_cookie: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    this.new_cookie = '';
  }

  public setCookie(cookie: string) {
    this.new_cookie = cookie;
  }

  public getCookie() {
    return this.new_cookie;
  }

  public cookieExpirationChecker(cookie: string, secret: string) {
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

  public tokenGenerator(
    token: string,
    user_id: number,
    expiration: string,
  ): string {
    return this.jwtService.sign(
      { user_id },
      { secret: token, expiresIn: expiration },
    );
  }

  public decodeToken(token: string): DecodedData {
    return this.jwtService.decode(token);
  }
}

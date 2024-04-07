import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ApiService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(user_id: number) {
    return await this.prisma.users.findMany({
      where: {
        id: {
          not: user_id,
        },
      },
    });
  }

  async getChats(user_id: number) {
    return await this.prisma.chats.findMany({
      where: {
        chat_members: {
          some: {
            user_id: user_id,
          },
        },
      },
      include: {
        chat_members: {
          include: {
            users: true,
          },
        },
      },
    });
  }
}

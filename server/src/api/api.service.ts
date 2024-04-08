import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ApiService {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsers(user_id: number) {
    return await this.prisma.users.findMany({
      where: {
        id: {
          not: user_id,
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

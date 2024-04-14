import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ApiService {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsers(user_id: number) {
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

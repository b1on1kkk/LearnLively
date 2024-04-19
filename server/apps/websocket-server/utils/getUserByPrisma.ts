import { PrismaService } from '@prismaORM/prisma';

export async function getUserByPrisma(prisma: PrismaService, id: number) {
  return await prisma.users.findUnique({
    where: {
      id,
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
}

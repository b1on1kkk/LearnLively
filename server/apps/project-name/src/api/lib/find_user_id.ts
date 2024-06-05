import { PrismaService } from '@prismaORM/prisma';

import type { findUserByIdPayload } from '../interfaces/findUserByIdPayload.interface';

export async function findUserById(
  prisma: PrismaService,
  user_id: number,
): Promise<findUserByIdPayload> {
  return await prisma.users.findUnique({
    where: { id: user_id },
    select: {
      id: true,
      name: true,
      lastname: true,
      email: true,
      surname: true,
      role: true,
      img_hash_name: true,
    },
  });
}

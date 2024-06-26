import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@prismaORM/prisma';

import { SharedService } from '@sharedService/shared';

import { userAuth } from './lib/user_auth';
import { findUserById } from './lib/find_user_id';

import type { Request } from 'express';

import type { CookieValues } from './interfaces/cookieValues';
import type { DecodedData } from 'apps/interfaces/decodedJwtData';
import type { EncodedJwt } from './interfaces/encoded_jwt.interface';

@Injectable()
export class ApiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly sharedService: SharedService,
  ) {}

  async getUser(req: Request) {
    const { access, refresh } = (req.cookies as CookieValues) || {};

    if (access) {
      const decoded: DecodedData = this.jwtService.decode(access);
      const user = await findUserById(this.prisma, decoded.user_id);

      if (
        refresh &&
        this.sharedService.cookieExp(refresh, process.env.JWT_REFRESH_TOKEN)
      ) {
        return userAuth(user, false, access, refresh);
      } else {
        return userAuth(user, false, access, null);
      }
    } else {
      if (
        this.sharedService.cookieExp(refresh, process.env.JWT_REFRESH_TOKEN)
      ) {
        const decoded: DecodedData = this.jwtService.decode(refresh);
        const user = await findUserById(this.prisma, decoded.user_id);

        if (user) {
          const { access_token, refresh_token } =
            this.sharedService.tokensGenerator(decoded.user_id);

          await this.prisma.refresh_token_metadata.updateMany({
            where: {
              user_id: user.id,
              issuedAt: this.sharedService.decodeToken(refresh).iat,
            },
            data: {
              ip: req.ip,
              device: req.headers['user-agent'],
              issuedAt: this.sharedService.decodeToken(refresh_token).iat,
            },
          });

          return userAuth(user, true, access_token, refresh_token);
        }
      }

      return false;
    }
  }

  async getStudents(req: Request) {
    const { access } = req.cookies;

    const decoded: EncodedJwt = this.jwtService.decode(access);

    return await this.sharedService.parceStudentsInf(decoded.user_id);
  }

  async getChats(req: Request) {
    const { access } = req.cookies;
    const { user_id }: EncodedJwt = this.jwtService.decode(access);

    return await this.prisma.users.findUnique({
      where: {
        id: user_id,
      },
      select: {
        users_conversations: {
          where: {
            conversations: {
              type: 'private',
            },
          },
          select: {
            conversations: {
              select: {
                id: true,
                type: true,
                conversation_hash: true,
                last_message: {
                  select: {
                    content: true,
                    seen: true,
                    sent_at: true,
                    user_id: true,
                  },
                },
                users_conversations: {
                  where: {
                    users: {
                      id: { not: user_id },
                    },
                  },
                  select: {
                    users: {
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
                        external_status: true,
                        friends_friends_friend_idTousers: {
                          where: {
                            user_id: user_id,
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
                            friend_id: user_id,
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
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getGroupChats(user_id: number) {
    return await this.prisma.group_users.findMany({
      where: {
        user_id: user_id,
      },
      select: {
        groups: {
          select: {
            id: true,
            conversation_id: true,
            group_name: true,
            description: true,
            conversations: {
              select: {
                id: true,
                type: true,
                conversation_hash: true,
                last_message: {
                  select: {
                    content: true,
                    seen: true,
                    sent_at: true,
                    user_id: true,
                    users: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
            group_users: {
              select: {
                users: {
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
                        user_id: user_id,
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
                        friend_id: user_id,
                      },
                      select: {
                        id: true,
                        user_id: true,
                        friend_id: true,
                        status: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getMessages(conversation_id: number) {
    return await this.prisma.messages.findMany({
      where: { conversation_id: { equals: conversation_id } },
      orderBy: {
        id: 'asc',
      },
      include: {
        users: {
          select: {
            name: true,
            lastname: true,
            img_hash_name: true,
            external_status: true,
          },
        },
        messages: {
          select: {
            content: true,
            users: {
              select: {
                name: true,
                lastname: true,
                img_hash_name: true,
                external_status: true,
              },
            },
          },
        },
      },
    });
  }

  async getSeenMessages(body: { message_id: number }) {
    return await this.prisma.seen_messages.findFirst({
      where: { message_id: body.message_id },
      select: { seen_at: true },
    });
  }
}

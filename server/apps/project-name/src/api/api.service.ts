import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@prismaORM/prisma';

import { SharedService } from '@sharedService/shared';

import type { Request } from 'express';
import type { EncodedJwt } from './interfaces/encoded_jwt.interface';

@Injectable()
export class ApiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly sharedService: SharedService,
  ) {}

  async getUser(req: Request) {
    const { access, refresh } = req.cookies;

    if (access) {
      const decoded: {
        user_id: number;
        iat: number;
        exp: number;
      } = this.jwtService.decode(access);

      const user = await this.prisma.users.findUnique({
        where: {
          id: decoded.user_id,
        },
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

      if (
        refresh &&
        this.sharedService.cookieExpirationChecker(
          refresh,
          process.env.JWT_REFRESH_TOKEN,
        )
      ) {
        return {
          user: user,
          update: false,
          tokens: {
            access,
            refresh,
          },
        };
      } else {
        return {
          user: user,
          update: false,
          tokens: {
            access,
            refresh: null,
          },
        };
      }
    } else {
      if (
        this.sharedService.cookieExpirationChecker(
          refresh,
          process.env.JWT_REFRESH_TOKEN,
        )
      ) {
        const decoded: {
          user_id: number;
          iat: number;
          exp: number;
        } = this.jwtService.decode(refresh);

        const user = await this.prisma.users.findUnique({
          where: {
            id: decoded.user_id,
          },
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

        const { access_token, refresh_token } =
          this.sharedService.tokensGenerator(decoded.user_id);

        const device_id = req.headers['x-header-device_id'] as string;

        await this.prisma.refresh_token_metadata.updateMany({
          where: {
            user_id: user.id,
            device_id: device_id,
            issuedAt: this.sharedService.decodeToken(refresh).iat,
          },
          data: {
            ip: req.ip,
            device: req.headers['user-agent'],
            issuedAt: this.sharedService.decodeToken(refresh_token).iat,
          },
        });

        return {
          user: user,
          update: true,
          tokens: {
            access: access_token,
            refresh: refresh_token,
          },
        };
      }

      return false;
    }
  }

  async getStudents(req: Request) {
    const { access } = req.cookies;

    const decoded: EncodedJwt = this.jwtService.decode(access);

    return await this.sharedService.parceStudentsInf(decoded.user_id);
  }

  // NEXT DOWN CONTINUE IMPROVING....

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
              },
            },
          },
        },
      },
    });
  }

  async getSeenMessages(body: { message_id: number; user_id: number }) {
    return await this.prisma.seen_messages.findMany({
      where: { message_id: body.message_id, user_id: body.user_id },
      select: {
        seen_at: true,
        messages: {
          select: {
            user_id: true,
          },
        },
        users: {
          select: {
            id: true,
            img_hash_name: true,
            name: true,
            lastname: true,
          },
        },
      },
    });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@prismaORM/prisma';

import { SharedService } from '@sharedService/shared';

@Injectable()
export class ApiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly sharedService: SharedService,
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
          const user = await this.prisma.users.findUnique({
            where: {
              id: decoded.id,
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

          // if cookie is still alive - do not generate new, just return old alive one
          if (this.sharedService.cookieExpirationChecker(cookies['jwt_lg'])) {
            return {
              user: user,
              token: cookies['jwt_lg'],
            };
          }

          // in other cases - generate new and return new one
          return {
            user: user,
            token: this.jwtService.sign(
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
    try {
      return await this.sharedService.getStudentsByPrisma(user_id);
    } catch (error) {
      throw new HttpException(
        'Something goes wrong :(',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getChats(user_id: number) {
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

  async getSeenMessages(message_id: number) {
    return await this.prisma.seen_messages.findMany({
      where: { message_id: message_id },
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

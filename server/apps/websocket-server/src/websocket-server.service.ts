import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaORM/prisma';

import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import type { ConnectedUserDTO } from '../dto/connectedUserDTO';

import { Server, Socket } from 'socket.io';
import { binaryUserSearch } from '../utils/binaryUserSearch';
import { SendFriendRequestDTO } from '../dto/sendFriendRequestDTO';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketServerService {
  @WebSocketServer()
  private server: Server;
  private ActiveUsers: Array<ConnectedUserDTO>;

  constructor(private readonly prisma: PrismaService) {
    this.ActiveUsers = [];
  }

  @SubscribeMessage('userConnected')
  connectionMessage(
    @MessageBody() dto: ConnectedUserDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const socket_id = binaryUserSearch(this.ActiveUsers, dto.user_id);

    if (!socket_id) {
      this.ActiveUsers.push(dto);

      this.ActiveUsers = this.ActiveUsers.sort((a, b) => a.user_id - b.user_id);
    } else {
      const idx = this.ActiveUsers.findIndex(
        (obj) => obj.socket_id === socket_id,
      );

      this.ActiveUsers[idx].socket_id = client.id;
    }

    console.log(this.ActiveUsers);
  }

  @SubscribeMessage('sendFriendRequest')
  async sendFriendRequest(
    @MessageBody() dto: SendFriendRequestDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const recipientSocketId = binaryUserSearch(this.ActiveUsers, dto.recipient);

    await this.prisma.friends.create({
      data: {
        user_id: dto.sender_id,
        friend_id: dto.recipient,
        status: 'pending',
        created_at: new Date(),
      },
    });

    const user = await this.prisma.users.findUnique({
      where: {
        id: dto.sender_id,
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

    this.server.to(client.id).emit('newUser', user);

    if (recipientSocketId) {
      const user2 = await this.prisma.users.findUnique({
        where: {
          id: dto.recipient,
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

      this.server.to(recipientSocketId).emit('newUser', user2);
    }
  }
}

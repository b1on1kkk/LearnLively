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
import type { ActiveUsersDTO } from '../dto/activeUsersDTO';

import { Server, Socket } from 'socket.io';
import { SendFriendRequestDTO } from '../dto/sendFriendRequestDTO';
import { getUserByPrisma } from '../utils/getUserByPrisma';
import { DisconnectedUserDTO } from '../dto/disconnectedUserDTO';
import { binaryUserSearchByUserId } from '../utils/binaryUserSearchBySocketId';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketServerService {
  @WebSocketServer()
  private server: Server;
  private ActiveUsers: Array<ActiveUsersDTO>;

  constructor(private readonly prisma: PrismaService) {
    this.ActiveUsers = [];
  }

  @SubscribeMessage('userConnected')
  connectionMessage(
    @MessageBody() dto: ConnectedUserDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const idx = binaryUserSearchByUserId(this.ActiveUsers, dto.user_id);

    if (idx === null) {
      this.ActiveUsers.push({ ...dto, socket_id: client.id });
      this.ActiveUsers = this.ActiveUsers.sort((a, b) => a.user_id - b.user_id);
    } else {
      this.ActiveUsers[idx].socket_id = client.id;
    }

    console.log(this.ActiveUsers);
  }

  @SubscribeMessage('userDisconnect')
  disconnectionMessage(
    @MessageBody() dto: DisconnectedUserDTO,
    @ConnectedSocket() client: Socket,
  ) {
    if (this.ActiveUsers.length > 0) {
      console.log('worked', client.id);

      this.ActiveUsers = this.ActiveUsers.filter(
        (user) => user.socket_id !== client.id,
      );

      console.log(this.ActiveUsers);
    }
  }

  @SubscribeMessage('sendFriendRequest')
  async sendFriendRequest(
    @MessageBody() dto: SendFriendRequestDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const recipientSocketId = binaryUserSearchByUserId(
      this.ActiveUsers,
      dto.recipient,
    );

    await this.prisma.friends.create({
      data: {
        user_id: dto.sender_id,
        friend_id: dto.recipient,
        status: 'pending',
        created_at: new Date(),
      },
    });

    const user = await getUserByPrisma(this.prisma, dto.sender_id);
    this.server.to(client.id).emit('newUser', user);

    if (recipientSocketId !== null) {
      const user2 = await getUserByPrisma(this.prisma, dto.recipient);
      this.server
        .to(this.ActiveUsers[recipientSocketId].socket_id)
        .emit('newUser', user2);
    }
  }
}

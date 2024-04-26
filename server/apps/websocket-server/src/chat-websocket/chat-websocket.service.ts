import { Server, Socket } from 'socket.io';

import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaService } from '@prismaORM/prisma';

import type { startChatDTO } from 'apps/websocket-server/dto/startChatDTO';
import type { ActiveUsersDTO } from 'apps/websocket-server/dto/activeUsersDTO';
import type { ConnectedUserDTO } from 'apps/websocket-server/dto/connectedUserDTO';

import { WebsocketUtils } from 'apps/websocket-server/utils/websocketUtils.service';

import WebSocket from '../abstract/webSocket';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chat' })
export class ChatWebsocketService implements WebSocket {
  @WebSocketServer()
  private server: Server;
  private ActiveChatUsers: Array<ActiveUsersDTO>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketUtilsService: WebsocketUtils,
  ) {
    this.ActiveChatUsers = [];
  }

  @SubscribeMessage('userChatConnected')
  connectionMessage(
    @MessageBody() dto: ConnectedUserDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const idx = this.websocketUtilsService.binaryUserSearchByUserId(
      this.ActiveChatUsers,
      dto.user_id,
    );

    if (idx === null) {
      this.ActiveChatUsers.push({ ...dto, socket_id: client.id });
      this.ActiveChatUsers = this.ActiveChatUsers.sort(
        (a, b) => a.user_id - b.user_id,
      );
    } else this.ActiveChatUsers[idx].socket_id = client.id;

    console.log(this.ActiveChatUsers, 'chat_socket connected');
  }

  @SubscribeMessage('userChatDisconnect')
  disconnectionMessage(@ConnectedSocket() client: Socket) {
    if (this.ActiveChatUsers.length > 0) {
      console.log('worked', client.id, 'chat_socket');

      this.ActiveChatUsers = this.ActiveChatUsers.filter(
        (user) => user.socket_id !== client.id,
      );

      console.log(this.ActiveChatUsers, 'chat_socket after disconnection');
    }
  }

  @SubscribeMessage('startChat')
  async startChat(
    @MessageBody() dto: startChatDTO,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { id: newConvId } = await this.prisma.conversations.create({
        data: {
          type: dto.chat_type,
        },
        select: {
          id: true,
        },
      });

      dto.users_idx.forEach(async (user_id) => {
        await this.prisma.users_conversations.create({
          data: {
            user_id: user_id,
            conversation_id: newConvId,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

import { Server } from 'socket.io';

import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaService } from '@prismaORM/prisma';
import { WebsocketUtils } from 'apps/websocket-server/utils/websocketUtils.service';
import { ActiveUsersDTO } from 'apps/websocket-server/dto/activeUsersDTO';

import { Socket } from 'socket.io';
import { ConnectedUserDTO } from 'apps/websocket-server/dto/connectedUserDTO';

import WebSocket from '../abstract/webSocket';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chat' })
export class ChatWebsocketService implements WebSocket {
  @WebSocketServer()
  private server: Server;
  private ActiveUsers: Array<ActiveUsersDTO>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketUtilsService: WebsocketUtils,
  ) {
    this.ActiveUsers = [];
  }

  @SubscribeMessage('userConnected')
  connectionMessage(
    @MessageBody() dto: ConnectedUserDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const idx = this.websocketUtilsService.binaryUserSearchByUserId(
      this.ActiveUsers,
      dto.user_id,
    );

    if (idx === null) {
      this.ActiveUsers.push({ ...dto, socket_id: client.id });
      this.ActiveUsers = this.ActiveUsers.sort((a, b) => a.user_id - b.user_id);
    } else this.ActiveUsers[idx].socket_id = client.id;

    console.log(this.ActiveUsers, 'chat_socket');
  }

  @SubscribeMessage('userDisconnect')
  disconnectionMessage(@ConnectedSocket() client: Socket) {
    if (this.ActiveUsers.length > 0) {
      console.log('worked', client.id, 'chat_socket');

      this.ActiveUsers = this.ActiveUsers.filter(
        (user) => user.socket_id !== client.id,
      );

      console.log(this.ActiveUsers, 'chat_socket');
    }
  }
}

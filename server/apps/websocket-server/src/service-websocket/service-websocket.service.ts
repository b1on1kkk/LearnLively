import { Server, Socket } from 'socket.io';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaORM/prisma';

import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import type { ActiveUsersDTO } from 'apps/websocket-server/dto/activeUsersDTO';
import type { ConnectedUserDTO } from 'apps/websocket-server/dto/connectedUserDTO';
import type { StudentDataDTO } from 'apps/websocket-server/dto/studentDataDTO';

import { binaryUserSearchByUserId } from 'apps/websocket-server/utils/binaryUserSearchBySocketId';
import { WebsocketUtils } from 'apps/websocket-server/utils/websocketUtils.service';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' }, namespace: 'service_logic' })
export class ServiceWebsocketService {
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
    const idx = binaryUserSearchByUserId(this.ActiveUsers, dto.user_id);

    if (idx === null) {
      this.ActiveUsers.push({ ...dto, socket_id: client.id });
      this.ActiveUsers = this.ActiveUsers.sort((a, b) => a.user_id - b.user_id);
    } else this.ActiveUsers[idx].socket_id = client.id;

    console.log(this.ActiveUsers);
  }

  @SubscribeMessage('userDisconnect')
  disconnectionMessage(@ConnectedSocket() client: Socket) {
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
    @MessageBody() dto: StudentDataDTO,
    @ConnectedSocket() client: Socket,
  ) {
    await this.prisma.friends.create({
      data: {
        user_id: dto.sender_id,
        friend_id: dto.recipient,
        status: 'pending',
        created_at: new Date(),
      },
    });

    await this.websocketUtilsService.studentData(
      this.ActiveUsers,
      dto,
      this.server,
      client,
    );
  }

  @SubscribeMessage('acceptFriendRequest')
  async acceptFriendRequest(
    @MessageBody() dto: StudentDataDTO,
    @ConnectedSocket() client: Socket,
  ) {
    await this.prisma.friends.update({
      where: {
        id: dto.request_id,
      },
      data: {
        status: 'accepted',
      },
    });

    await this.websocketUtilsService.studentData(
      this.ActiveUsers,
      dto,
      this.server,
      client,
    );
  }

  @SubscribeMessage('rejectFriendRequest')
  async rejectFriendRequest(
    @MessageBody() dto: StudentDataDTO,
    @ConnectedSocket() client: Socket,
  ) {
    await this.prisma.friends.delete({ where: { id: dto.request_id } });

    await this.websocketUtilsService.studentData(
      this.ActiveUsers,
      dto,
      this.server,
      client,
    );
  }
}

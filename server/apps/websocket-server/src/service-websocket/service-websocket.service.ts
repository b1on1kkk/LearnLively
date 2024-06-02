import { v4 as uuidv4 } from 'uuid';

import { Server, Socket } from 'socket.io';

import { Injectable, UseFilters, UseGuards } from '@nestjs/common';
import { PrismaService } from '@prismaORM/prisma';

import { ApiService } from 'apps/project-name/src/api/api.service';

import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import WebSocket from '../abstract/webSocket';

import { WebsocketUtils } from 'apps/websocket-server/utils/websocketUtils.service';

import type { ActiveUsersDTO } from 'apps/websocket-server/dto/activeUsersDTO';
import type { StudentDataDTO } from 'apps/websocket-server/dto/studentDataDTO';
import type { CreateGroupDTO } from 'apps/websocket-server/dto/createGroupDTO';
import type { ConnectedUserDTO } from 'apps/websocket-server/dto/connectedUserDTO';
import { JwtGuardGuard } from 'apps/websocket-server/guard/jwt_guard.guard';
import { BadRequestExceptionsFilter } from 'apps/websocket-server/filter/filter';

@Injectable()
@WebSocketGateway({
  cors: { origin: process.env.CLIENT_ORIGIN, credentials: true },
  namespace: 'service_logic',
})
export class ServiceWebsocketService implements WebSocket {
  @WebSocketServer()
  private server: Server;
  private ActiveUsers: Array<ActiveUsersDTO>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketUtilsService: WebsocketUtils,
    private readonly apiService: ApiService,
  ) {
    this.ActiveUsers = [];
  }

  @UseGuards(JwtGuardGuard)
  @UseFilters(BadRequestExceptionsFilter)
  @SubscribeMessage('userConnected')
  connectionMessage(
    @MessageBody() dto: ConnectedUserDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const idx = this.websocketUtilsService.binaryUserSearchByUserId<
      Array<ActiveUsersDTO>
    >(this.ActiveUsers, dto.id);

    if (idx === null) {
      this.ActiveUsers.push({ ...dto, socket_id: client.id });
      this.ActiveUsers = this.ActiveUsers.sort((a, b) => a.id - b.id);
    } else {
      this.ActiveUsers[idx].socket_id = client.id;
    }

    console.log(this.ActiveUsers, 'service_logic_socket connected');
  }

  @SubscribeMessage('userDisconnect')
  disconnectionMessage(@ConnectedSocket() client: Socket) {
    if (this.ActiveUsers.length > 0) {
      console.log('worked', client.id, 'service_logic_socket');

      this.ActiveUsers = this.ActiveUsers.filter(
        (user) => user.socket_id !== client.id,
      );

      console.log(this.ActiveUsers, 'service_logic_socket after disconnection');
    }
  }

  @UseGuards(JwtGuardGuard)
  @UseFilters(BadRequestExceptionsFilter)
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

  @UseGuards(JwtGuardGuard)
  @UseFilters(BadRequestExceptionsFilter)
  @SubscribeMessage('acceptFriendRequest')
  async acceptFriendRequest(
    @MessageBody() dto: StudentDataDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const group_uuid = uuidv4();

    await this.prisma.friends.update({
      where: {
        id: dto.request_id,
      },
      data: {
        status: 'accepted',
      },
    });

    const { id } = await this.prisma.conversations.create({
      data: {
        type: 'private',
        group_uuid: group_uuid,
        conversation_hash: uuidv4(),
      },
      select: {
        id: true,
      },
    });

    const usersCreateChatWith = [dto.sender_id, dto.recipient];

    const insertionPromises = usersCreateChatWith.map(async (idx) => {
      return await this.prisma.users_conversations.create({
        data: {
          user_id: idx,
          conversation_id: id,
        },
      });
    });

    // wait till data will be inserted
    await Promise.all(insertionPromises);

    await this.websocketUtilsService.studentData(
      this.ActiveUsers,
      dto,
      this.server,
      client,
    );
  }

  @UseGuards(JwtGuardGuard)
  @UseFilters(BadRequestExceptionsFilter)
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

  @UseGuards(JwtGuardGuard)
  @UseFilters(BadRequestExceptionsFilter)
  @SubscribeMessage('startGroupChat')
  async startGroupChat(
    @MessageBody() dto: CreateGroupDTO,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const group_uuid = uuidv4();

      // create new conversation
      const { id: newConvId } = await this.prisma.conversations.create({
        data: {
          type: dto.chat_type,
          group_uuid: group_uuid,
          conversation_hash: uuidv4(),
        },
        select: {
          id: true,
        },
      });

      await this.prisma.users_conversations.create({
        data: {
          user_id: dto.owner_id,
          conversation_id: newConvId,
        },
      });

      const { id: newGroupId } = await this.prisma.groups.create({
        data: {
          conversation_id: newConvId,
          owner_id: dto.owner_id,
          group_name: dto.group_name,
          description: dto.description,
        },
        select: {
          id: true,
        },
      });

      // adding owner to group
      await this.prisma.group_users.create({
        data: {
          group_id: newGroupId,
          user_id: dto.owner_id,
        },
      });

      // add other users
      const insertionPromises = dto.users_idx.map(async (idx) => {
        return await this.prisma.group_users.create({
          data: {
            group_id: newGroupId,
            user_id: idx,
          },
        });
      });

      // wait till all manipulations will be done
      await Promise.all(insertionPromises);

      // first new data to sender
      this.server
        .to(client.id)
        .emit('getGroups', await this.apiService.getGroupChats(dto.owner_id));

      // then send others that online
      dto.users_idx.forEach(async (id) => {
        const idx = this.websocketUtilsService.binaryUserSearchByUserId<
          Array<ActiveUsersDTO>
        >(this.ActiveUsers, id);

        if (idx !== null) {
          this.server
            .to(this.ActiveUsers[idx].socket_id)
            .emit(
              'getGroups',
              await this.apiService.getGroupChats(dto.owner_id),
            );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

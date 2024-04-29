import { v4 as uuidv4 } from 'uuid';

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

import { WebsocketUtils } from 'apps/websocket-server/utils/websocketUtils.service';

import WebSocket from '../abstract/webSocket';
import { ApiService } from 'apps/project-name/src/api/api.service';

import type { MessageDTO } from 'apps/websocket-server/dto/messageDTO';
import type { startChatDTO } from 'apps/websocket-server/dto/startChatDTO';
import type { ActiveUsersDTO } from 'apps/websocket-server/dto/activeUsersDTO';
import type { ConnectedUserDTO } from 'apps/websocket-server/dto/connectedUserDTO';

export interface ChosenConv {
  id: number;
  uuid: string;
}

@Injectable()
@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chat' })
export class ChatWebsocketService implements WebSocket {
  @WebSocketServer()
  private server: Server;
  private ActiveChatUsers: Array<ActiveUsersDTO>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketUtilsService: WebsocketUtils,
    private readonly apiService: ApiService,
  ) {
    this.ActiveChatUsers = [];
  }

  //////////////////////////////////////////////MAIN////////////////////////////////////////////////////
  @SubscribeMessage('userChatConnected')
  connectionMessage(
    @MessageBody() dto: ConnectedUserDTO,
    @ConnectedSocket() client: Socket,
  ) {
    this.ActiveChatUsers.push({ user_id: dto.user_id, socket_id: client.id });
    this.ActiveChatUsers = this.ActiveChatUsers.sort(
      (a, b) => a.user_id - b.user_id,
    );

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
  //////////////////////////////////////////////MAIN END//////////////////////////////////////////////

  // in development
  @SubscribeMessage('connectToChatRoom')
  connectToChatRoom(
    @MessageBody() dto: ChosenConv | null,
    @ConnectedSocket() client: Socket,
  ) {
    if (dto) {
      console.log(client.id, 'connect to room');
      client.join(dto.uuid);
    }
  }

  @SubscribeMessage('leaveChatRoom')
  leaveChatRoom(
    @MessageBody() dto: ChosenConv | null,
    @ConnectedSocket() client: Socket,
  ) {
    if (dto) {
      console.log(client.id, 'leave the room');
      client.leave(dto.uuid);
    }
  }
  //

  @SubscribeMessage('startChat')
  async startChat(@MessageBody() dto: startChatDTO) {
    try {
      const { id: newConvId } = await this.prisma.conversations.create({
        data: {
          type: dto.chat_type,
          group_uuid: uuidv4(),
        },
        select: {
          id: true,
        },
      });

      const message = await this.prisma.messages.create({
        data: {
          user_id: dto.users_idx[0],
          conversation_id: newConvId,
          content: dto.message,
          sent_at: new Date(),
          delivered_at: new Date(),
          edited: false,
        },
        select: {
          user_id: true,
          conversation_id: true,
          content: true,
          sent_at: true,
          delivered_at: true,
          edited: true,
          users: {
            select: {
              name: true,
              lastname: true,
              img_hash_name: true,
            },
          },
          seen_messages: {
            select: {
              message_id: true,
              seen_at: true,
              users: {
                select: {
                  img_hash_name: true,
                  name: true,
                  lastname: true,
                },
              },
            },
          },
        },
      });

      const insertionPromises = dto.users_idx.map(async (user_id) => {
        return this.prisma.users_conversations.create({
          data: {
            user_id: user_id,
            conversation_id: newConvId,
          },
        });
      });

      // wait till data will be inserted
      await Promise.all(insertionPromises);

      dto.users_idx.forEach(async (user_id) => {
        const idx = this.websocketUtilsService.binaryUserSearchByUserId(
          this.ActiveChatUsers,
          user_id,
        );

        if (idx !== null) {
          this.server
            .to(this.ActiveChatUsers[idx].socket_id)
            .emit('startChat', {
              chats: (await this.apiService.getChats(user_id))
                .users_conversations,
              message: [message],
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() dto: MessageDTO) {
    try {
      const { user_id, content, conversation_id } = dto;

      const message = {
        user_id: user_id,
        conversation_id: conversation_id,
        content: content,
        sent_at: new Date(),
        delivered_at: new Date(),
        edited: false,
      };

      await this.prisma.messages.create({
        data: {
          ...message,
        },
      });

      this.server.to(dto.uuid).emit('getMessage', {
        ...message,
        seen_messages: [],
        users: {
          img_hash_name: dto.img_hash_name,
          name: dto.name,
          lastname: dto.lastname,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

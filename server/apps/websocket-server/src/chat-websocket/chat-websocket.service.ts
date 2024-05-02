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

import type { MessageDTO } from 'apps/websocket-server/dto/messageDTO';
import type { startChatDTO } from 'apps/websocket-server/dto/startChatDTO';
import type { ChosenConvDTO } from 'apps/websocket-server/dto/chosenConvDTO';
import type { ActiveUsersDTO } from 'apps/websocket-server/dto/activeUsersDTO';
import type { ConnectedUserDTO } from 'apps/websocket-server/dto/connectedUserDTO';

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

  //////////////////////////////////////////////MAIN//////////////////////////////////////////////////////
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
  //////////////////////////////////////////////MAIN END//////////////////////////////////////////////////

  @SubscribeMessage('connectToChatRoom')
  connectToChatRoom(
    @MessageBody() dto: ChosenConvDTO | null,
    @ConnectedSocket() client: Socket,
  ) {
    if (dto) {
      console.log(client.id, 'connect to room');
      client.join(dto.uuid);
    }
  }

  @SubscribeMessage('leaveChatRoom')
  leaveChatRoom(
    @MessageBody() dto: ChosenConvDTO | null,
    @ConnectedSocket() client: Socket,
  ) {
    if (dto) {
      console.log(client.id, 'leave the room');
      client.leave(dto.uuid);
    }
  }

  @SubscribeMessage('startChat')
  async startChat(
    @MessageBody() dto: startChatDTO,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const group_uuid = uuidv4();

      // create new conversation
      const { id: newConvId } = await this.prisma.conversations.create({
        data: {
          type: dto.chat_type,
          group_uuid: group_uuid,
        },
        select: {
          id: true,
        },
      });

      // create room and connect user to new conversation
      this.connectToChatRoom({ id: 666, uuid: group_uuid }, client);

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
          id: true,
          user_id: true,
          conversation_id: true,
          content: true,
          sent_at: true,
          delivered_at: true,
          edited: true,
          replies_to: true,
          messages: {
            select: {
              content: true,
              users: {
                select: {
                  img_hash_name: true,
                  name: true,
                  lastname: true,
                },
              },
            },
          },
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

      this.websocketUtilsService.MessageSender(
        { uuid: group_uuid, message: { ...message, selected: false } },
        message.id,
        this.server,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() dto: MessageDTO) {
    try {
      const message_id = await this.prisma.messages.create({
        data: {
          user_id: dto.message.user_id,
          conversation_id: dto.message.conversation_id,
          content: dto.message.content,
          edited: dto.message.edited,
          sent_at: dto.message.sent_at,
          delivered_at: dto.message.delivered_at,
          replies_to: dto.message.replies_to,
        },
        select: {
          id: true,
        },
      });

      this.websocketUtilsService.MessageSender(dto, message_id.id, this.server);
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('changeEditedMessage')
  async changeEditedMessage(@MessageBody() dto: MessageDTO) {
    try {
      const { message } = dto;

      await this.prisma.messages.update({
        where: { id: message.id },
        data: {
          content: message.content,
          edited: message.edited,
        },
      });

      this.server.in(dto.uuid).emit('getChangedEditedMessage', { ...message });
    } catch (error) {
      console.log(error);
    }
  }
}

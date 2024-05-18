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

import { ApiService } from 'apps/project-name/src/api/api.service';
import { WebsocketUtils } from 'apps/websocket-server/utils/websocketUtils.service';

import WebSocket from '../abstract/webSocket';

import type { startChatDTO } from 'apps/websocket-server/dto/startChatDTO';
import type { ChosenConvDTO } from 'apps/websocket-server/dto/chosenConvDTO';
import type { ActiveUsersDTO } from 'apps/websocket-server/dto/activeUsersDTO';
import type { SendMessageDTO } from 'apps/websocket-server/dto/sendMessageDTO';
import type { ReadMessageDTO } from 'apps/websocket-server/dto/readMessageDTO';
import type { ConnectedUserDTO } from 'apps/websocket-server/dto/connectedUserDTO';
import type { DeleteMessagesDTO } from 'apps/websocket-server/dto/deleteMessagesDTO';

interface CreateGroupDTO extends Exclude<startChatDTO, 'messages'> {
  group_name: string;
  description: string;
  owner_id: number;
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

      // wait till data will be inserted
      await Promise.all(insertionPromises);

      // than create room and connect user to new conversation
      this.connectToChatRoom({ id: 666, uuid: group_uuid }, client);
    } catch (error) {
      console.log(error);
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
          sent_at: new Date().toLocaleTimeString(),
          delivered_at: new Date().toLocaleTimeString(),
          edited: false,
          seen: false,
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
        },
      });

      const insertionPromises = dto.users_idx.map(async (user_id) => {
        return await this.prisma.users_conversations.create({
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
            .emit('getJustCreatedChats', [
              ...(
                await this.apiService.getChats(
                  this.ActiveChatUsers[idx].user_id,
                )
              ).users_conversations,
            ]);
        }
      });

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
  async sendMessage(@MessageBody() dto: SendMessageDTO) {
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
          seen: false,
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
  async changeEditedMessage(@MessageBody() dto: SendMessageDTO) {
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

  @SubscribeMessage('deleteMessages')
  async deleteMessages(@MessageBody() dto: DeleteMessagesDTO) {
    try {
      const { message } = dto;
      const { uuid, conversation_id } = dto.meta_data;

      const insertionPromises = message.map(async (msg) => {
        if (msg.selected) {
          await this.prisma.seen_messages.deleteMany({
            where: { message_id: msg.id },
          });

          await this.prisma.messages.updateMany({
            where: {
              replies_to: msg.id,
            },
            data: { replies_to: null },
          });

          return await this.prisma.messages.delete({ where: { id: msg.id } });
        }
      });

      // wait till all manipulations will be done
      await Promise.all(insertionPromises);

      this.server
        .in(uuid)
        .emit('getDeletedMessages', [
          ...(await this.apiService.getMessages(conversation_id)),
        ]);
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('readMessage')
  async readMessage(
    @MessageBody()
    dto: ReadMessageDTO,
  ) {
    try {
      const { message, meta_data } = dto;

      const insertionPromises = message.map(async (msg) => {
        await this.prisma.messages.update({
          where: { id: msg.id },
          data: {
            seen: true,
          },
        });

        return await this.prisma.seen_messages.create({
          data: {
            message_id: msg.id,
            user_id: meta_data.seen_user_id,
            seen_at: new Date().toLocaleTimeString(),
          },
        });
      });

      await Promise.all(insertionPromises);

      this.server
        .to(meta_data.uuid)
        .emit('getReadMessage', [
          ...(await this.apiService.getMessages(message[0].conversation_id)),
        ]);
    } catch (error) {
      console.log(error);
    }
  }
}

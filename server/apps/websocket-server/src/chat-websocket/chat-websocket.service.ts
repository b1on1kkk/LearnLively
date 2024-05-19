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
import type { CachedUuidsDTO } from 'apps/websocket-server/dto/cachedUuidsDTO';

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
  private cachedUsersUuids: Array<CachedUuidsDTO>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketUtilsService: WebsocketUtils,
    private readonly apiService: ApiService,
  ) {
    this.ActiveChatUsers = [];
    this.cachedUsersUuids = [];
  }

  //////////////////////////////////////////////MAIN//////////////////////////////////////////////////////
  @SubscribeMessage('userChatConnected')
  connectionMessage(
    @MessageBody() dto: ConnectedUserDTO,
    @ConnectedSocket() client: Socket,
  ) {
    this.ActiveChatUsers.push({ id: dto.id, socket_id: client.id });
    this.ActiveChatUsers = this.ActiveChatUsers.sort((a, b) => a.id - b.id);

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
  async connectToChatRoom(
    @MessageBody() dto: ChosenConvDTO | null,
    @ConnectedSocket() client: Socket,
  ) {
    if (dto) {
      console.log(client.id, 'connect to room');

      // find if in cache we have chat uuid
      const idx = this.websocketUtilsService.binaryUserSearchByUserId<
        Array<CachedUuidsDTO>
      >(this.cachedUsersUuids, dto.id);

      // if it - just connet
      if (idx !== null) {
        client.join(this.cachedUsersUuids[idx].uuid);
      } else {
        // if not - push
        const { group_uuid } = await this.prisma.conversations.findFirst({
          where: { id: dto.id },
        });

        this.cachedUsersUuids.push({ id: dto.id, uuid: group_uuid });
        this.cachedUsersUuids = this.cachedUsersUuids.sort(
          (a, b) => a.id - b.id,
        );

        client.join(group_uuid);
      }

      console.log(this.cachedUsersUuids, 'cache uuids after connection');
    }
  }

  @SubscribeMessage('leaveChatRoom')
  async leaveChatRoom(
    @MessageBody() dto: ChosenConvDTO | null,
    @ConnectedSocket() client: Socket,
  ) {
    if (dto) {
      console.log(client.id, 'leave the room');

      const idx = this.websocketUtilsService.binaryUserSearchByUserId<
        Array<CachedUuidsDTO>
      >(this.cachedUsersUuids, dto.id);

      client.leave(this.cachedUsersUuids[idx].uuid);

      console.log(this.cachedUsersUuids, 'cache uuids after disconnection');
    }
  }

  // in development
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
      dto.users_idx.map(async (idx) => {
        return await this.prisma.group_users.create({
          data: {
            group_id: newGroupId,
            user_id: idx,
          },
        });
      });
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

      const { group_uuid } = await this.prisma.conversations.findFirst({
        where: { id: dto.conv_id },
      });

      this.websocketUtilsService.MessageSender(
        dto,
        group_uuid,
        message_id.id,
        this.server,
      );
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

      const { group_uuid } = await this.prisma.conversations.findFirst({
        where: { id: dto.conv_id },
      });

      this.server
        .in(group_uuid)
        .emit('getChangedEditedMessage', { ...message });
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('deleteMessages')
  async deleteMessages(@MessageBody() dto: DeleteMessagesDTO) {
    try {
      const insertionPromises = dto.message.map(async (msg) => {
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

      const { group_uuid } = await this.prisma.conversations.findFirst({
        where: { id: dto.conv_id },
      });

      this.server
        .in(group_uuid)
        .emit('getDeletedMessages', [
          ...(await this.apiService.getMessages(dto.conv_id)),
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

      // wait till all manipulations will be done
      await Promise.all(insertionPromises);

      const { group_uuid } = await this.prisma.conversations.findFirst({
        where: { id: meta_data.conv_id },
      });

      this.server
        .to(group_uuid)
        .emit('getReadMessage', [
          ...(await this.apiService.getMessages(meta_data.conv_id)),
        ]);
    } catch (error) {
      console.log(error);
    }
  }
}

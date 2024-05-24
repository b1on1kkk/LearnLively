// import { v4 as uuidv4 } from 'uuid';

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

import type { ChosenConvDTO } from 'apps/websocket-server/dto/chosenConvDTO';
import type { ActiveUsersDTO } from 'apps/websocket-server/dto/activeUsersDTO';
import type { SendMessageDTO } from 'apps/websocket-server/dto/sendMessageDTO';
import type { ReadMessageDTO } from 'apps/websocket-server/dto/readMessageDTO';
import type { CachedUuidsDTO } from 'apps/websocket-server/dto/cachedUuidsDTO';
import type { ConnectedUserDTO } from 'apps/websocket-server/dto/connectedUserDTO';
import type { DeleteMessagesDTO } from 'apps/websocket-server/dto/deleteMessagesDTO';

interface isTypingDTO {
  conv_id: number;
  user: { id: number; name: string };
}

export interface isTypingNowCacheDTO {
  id: number;
  users: Array<{ id: number; name: string; timeId: NodeJS.Timeout }>;
}

@Injectable()
@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chat' })
export class ChatWebsocketService implements WebSocket {
  @WebSocketServer()
  private server: Server;
  private ActiveChatUsers: Array<ActiveUsersDTO>;
  private cachedUsersUuids: Array<CachedUuidsDTO>;
  private isTypingNow: Array<isTypingNowCacheDTO>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketUtilsService: WebsocketUtils,
    private readonly apiService: ApiService,
  ) {
    this.ActiveChatUsers = [];
    this.cachedUsersUuids = [];
    this.isTypingNow = [];
  }

  //////////////////////////////////////////////MAIN//////////////////////////////////////////////////////
  @SubscribeMessage('userChatConnected')
  connectionMessage(
    @MessageBody() dto: ConnectedUserDTO,
    @ConnectedSocket() client: Socket,
  ) {
    this.ActiveChatUsers.push({ id: dto.id, socket_id: client.id });
    this.ActiveChatUsers = this.ActiveChatUsers.sort((a, b) => a.id - b.id);

    const onlineIndexes: Array<number> = [];

    this.ActiveChatUsers.forEach((user) => {
      onlineIndexes.push(user.id);
    });

    this.server.emit('onlineUsers', onlineIndexes);

    console.log(this.ActiveChatUsers, 'chat_socket connected');
  }

  @SubscribeMessage('userChatDisconnect')
  disconnectionMessage(@ConnectedSocket() client: Socket) {
    if (this.ActiveChatUsers.length > 0) {
      console.log('worked', client.id, 'chat_socket');

      this.ActiveChatUsers = this.ActiveChatUsers.filter(
        (user) => user.socket_id !== client.id,
      );

      const onlineIndexes: Array<number> = [];

      this.ActiveChatUsers.forEach((user) => {
        onlineIndexes.push(user.id);
      });

      this.server.emit('onlineUsers', onlineIndexes);

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

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() dto: SendMessageDTO) {
    try {
      const { id } = await this.prisma.messages.create({
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

      await this.prisma.conversations.update({
        where: {
          id: dto.message.conversation_id,
        },
        data: {
          last_msg: id,
        },
      });

      const idx = this.websocketUtilsService.binaryUserSearchByUserId<
        Array<CachedUuidsDTO>
      >(this.cachedUsersUuids, dto.conv_id);

      this.websocketUtilsService.MessageSender(
        dto,
        this.cachedUsersUuids[idx].uuid,
        id,
        this.server,
      );
    } catch (error) {
      console.log(error);
    }
  }

  // in development
  @SubscribeMessage('isTyping')
  isTyping(@MessageBody() dto: isTypingDTO, @ConnectedSocket() client: Socket) {
    try {
      console.log(dto);

      const idx = this.websocketUtilsService.binaryUserSearchByUserId<
        Array<isTypingNowCacheDTO>
      >(this.isTypingNow, dto.conv_id);

      // conv is not exist in cache
      if (idx === null) {
        console.log('creating new conv');

        const conv: isTypingNowCacheDTO = {
          id: dto.conv_id,
          users: [
            {
              id: dto.user.id,
              name: dto.user.name,
              timeId: setTimeout(() => {
                removeUserFromCache(
                  conv,
                  this.websocketUtilsService.binaryUserSearchByUserId<
                    Array<{ id: number; name: string; timeId: NodeJS.Timeout }>
                  >(conv.users, dto.user.id),
                );
                console.log('isTypingNow:', this.isTypingNow, '----213');
              }, 5000),
            },
          ],
        };

        this.isTypingNow.push(conv);

        this.isTypingNow = this.isTypingNow.sort((a, b) => a.id - b.id);
      } else {
        console.log('go to exist conv');

        const usersArray = this.isTypingNow[idx].users;

        const user_id = this.websocketUtilsService.binaryUserSearchByUserId<
          Array<{ id: number; name: string; timeId: NodeJS.Timeout }>
        >(usersArray, dto.user.id);

        // user exist
        if (user_id !== null) {
          clearTimeout(this.isTypingNow[idx].users[user_id].timeId);

          this.isTypingNow[idx].users[user_id].timeId = setTimeout(() => {
            const user_id = this.websocketUtilsService.binaryUserSearchByUserId<
              Array<{ id: number; name: string; timeId: NodeJS.Timeout }>
            >(this.isTypingNow[idx].users, dto.user.id);

            removeUserFromCache(this.isTypingNow[idx], user_id);

            console.log('isTypingNow:', this.isTypingNow, '----241');
          }, 5000);
        } else {
          this.isTypingNow[idx].users.push({
            ...dto.user,
            timeId: setTimeout(() => {
              removeUserFromCache(this.isTypingNow[idx], null);

              console.log('isTypingNow:', this.isTypingNow, '----248');
            }, 5000),
          });

          this.isTypingNow[idx].users = this.isTypingNow[idx].users.sort(
            (a, b) => a.id - b.id,
          );
        }
      }

      const removeUserFromCache = (
        conv: isTypingNowCacheDTO,
        userId: number | null,
      ) => {
        if (userId !== null) {
          console.log(userId);
          console.log(conv.users[userId].timeId, '------272');

          clearTimeout(conv.users[userId].timeId);
          conv.users = conv.users.filter((u) => u.id !== conv.users[userId].id);
        } else {
          console.log(conv.users[userId].timeId, '------276');

          const user_id = this.websocketUtilsService.binaryUserSearchByUserId<
            Array<{ id: number; name: string; timeId: NodeJS.Timeout }>
          >(conv.users, dto.user.id);

          clearTimeout(conv.users[user_id].timeId);

          conv.users = conv.users.filter(
            (u) => u.id !== conv.users[user_id].id,
          );
        }

        if (conv.users.length === 0) {
          this.isTypingNow = this.isTypingNow.filter((c) => c.id !== conv.id);
        }
      };

      console.log('----------------', this.isTypingNow, '----------------');
    } catch (error) {
      console.log(error);
    }
  }
  //

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

      const idx = this.websocketUtilsService.binaryUserSearchByUserId<
        Array<CachedUuidsDTO>
      >(this.cachedUsersUuids, dto.conv_id);

      this.server
        .in(this.cachedUsersUuids[idx].uuid)
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
            where: { replies_to: msg.id },
            data: { replies_to: null },
          });

          await this.prisma.conversations.update({
            where: { id: dto.conv_id },
            data: { last_msg: null },
          });

          return await this.prisma.messages.delete({ where: { id: msg.id } });
        }
      });

      // wait till all manipulations will be done
      await Promise.all(insertionPromises);

      const idx = this.websocketUtilsService.binaryUserSearchByUserId<
        Array<CachedUuidsDTO>
      >(this.cachedUsersUuids, dto.conv_id);

      this.server
        .in(this.cachedUsersUuids[idx].uuid)
        .emit('getDeletedMessages', [
          ...(await this.apiService.getMessages(dto.conv_id)),
        ]);
    } catch (error) {
      console.log(error);
    }
  }

  // will be changed in next upgrade
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

      const idx = this.websocketUtilsService.binaryUserSearchByUserId<
        Array<CachedUuidsDTO>
      >(this.cachedUsersUuids, dto.meta_data.conv_id);

      this.server
        .to(this.cachedUsersUuids[idx].uuid)
        .emit('getReadMessage', [
          ...(await this.apiService.getMessages(meta_data.conv_id)),
        ]);
    } catch (error) {
      console.log(error);
    }
  }
}

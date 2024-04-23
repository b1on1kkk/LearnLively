import { Server } from 'socket.io';

import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { PrismaService } from '@prismaORM/prisma';
import { WebsocketUtils } from 'apps/websocket-server/utils/websocketUtils.service';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chat' })
export class ChatWebsocketService {
  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketUtilsService: WebsocketUtils,
  ) {}
}

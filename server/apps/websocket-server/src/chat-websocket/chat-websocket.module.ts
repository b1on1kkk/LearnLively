import { Module } from '@nestjs/common';
import { ChatWebsocketService } from './chat-websocket.service';
import { PrismaModule } from '@prismaORM/prisma';
import { SharedModule } from '@sharedService/shared';
import { WebsocketUtils } from 'apps/websocket-server/utils/websocketUtils.service';
import { ApiService } from 'apps/project-name/src/api/api.service';

@Module({
  imports: [PrismaModule, SharedModule],
  providers: [ChatWebsocketService, WebsocketUtils, ApiService],
})
export class ChatWebsocketModule {}

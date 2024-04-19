import { Module } from '@nestjs/common';
import { WebsocketServerService } from './websocket-server.service';
import { PrismaModule } from '@prismaORM/prisma';
import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';
import { SharedModule } from '@sharedService/shared';
import { WebsocketUtils } from '../utils/websocketUtils.service';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [],
  providers: [WebsocketServerService, ErrorCatcherInterceptor, WebsocketUtils],
})
export class WebsocketServerModule {}

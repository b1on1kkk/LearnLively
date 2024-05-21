import { Module } from '@nestjs/common';
import { ServiceWebsocketService } from './service-websocket.service';
import { PrismaModule } from '@prismaORM/prisma';
import { SharedModule } from '@sharedService/shared';
import { WebsocketUtils } from 'apps/websocket-server/utils/websocketUtils.service';
import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';
import { ApiService } from 'apps/project-name/src/api/api.service';

@Module({
  imports: [PrismaModule, SharedModule],
  providers: [
    ServiceWebsocketService,
    WebsocketUtils,
    ErrorCatcherInterceptor,
    ApiService,
  ],
})
export class ServiceWebsocketModule {}

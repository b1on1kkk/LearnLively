import { Module } from '@nestjs/common';
import { WebsocketServerService } from './websocket-server.service';
import { PrismaModule } from '@prismaORM/prisma';
import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [WebsocketServerService, ErrorCatcherInterceptor],
})
export class WebsocketServerModule {}

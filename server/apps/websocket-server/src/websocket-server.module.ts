import { Module } from '@nestjs/common';
import { WebsocketServerController } from './websocket-server.controller';
import { WebsocketServerService } from './websocket-server.service';
import { PrismaModule } from '@prismaORM/prisma';
import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';

@Module({
  imports: [PrismaModule],
  controllers: [WebsocketServerController],
  providers: [WebsocketServerService, ErrorCatcherInterceptor],
})
export class WebsocketServerModule {}

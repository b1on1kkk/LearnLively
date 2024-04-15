import { Module } from '@nestjs/common';
import { WebsocketServerController } from './websocket-server.controller';
import { WebsocketServerService } from './websocket-server.service';

@Module({
  imports: [],
  controllers: [WebsocketServerController],
  providers: [WebsocketServerService],
})
export class WebsocketServerModule {}

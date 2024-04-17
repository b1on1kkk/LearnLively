import { Module } from '@nestjs/common';
import { WebsocketServerController } from './websocket-server.controller';
import { WebsocketServerService } from './websocket-server.service';
import { SocketService } from '../socket/socket.service';

@Module({
  imports: [],
  controllers: [WebsocketServerController],
  providers: [WebsocketServerService, SocketService],
})
export class WebsocketServerModule {}

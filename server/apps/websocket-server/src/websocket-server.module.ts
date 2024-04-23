import { Module } from '@nestjs/common';

import { ChatWebsocketModule } from './chat-websocket/chat-websocket.module';
import { ServiceWebsocketModule } from './service-websocket/service-websocket.module';

@Module({
  imports: [ChatWebsocketModule, ServiceWebsocketModule],
})
export class WebsocketServerModule {}

import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';

import { ChatWebsocketModule } from './chat-websocket/chat-websocket.module';
import { ServiceWebsocketModule } from './service-websocket/service-websocket.module';

@Module({
  imports: [MailerModule, ChatWebsocketModule, ServiceWebsocketModule],
})
export class WebsocketServerModule {}

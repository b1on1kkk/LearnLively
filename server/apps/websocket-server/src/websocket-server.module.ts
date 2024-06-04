import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';

import { ChatWebsocketModule } from './chat-websocket/chat-websocket.module';
import { ServiceWebsocketModule } from './service-websocket/service-websocket.module';
import { AuthMailerModule } from './auth-mailer/auth-mailer.module';

@Module({
  imports: [
    MailerModule,
    ChatWebsocketModule,
    ServiceWebsocketModule,
    AuthMailerModule,
  ],
})
export class WebsocketServerModule {}

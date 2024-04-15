import { NestFactory } from '@nestjs/core';
import { WebsocketServerModule } from './websocket-server.module';

async function bootstrap() {
  const app = await NestFactory.create(WebsocketServerModule);
  await app.listen(3001);
}
bootstrap();

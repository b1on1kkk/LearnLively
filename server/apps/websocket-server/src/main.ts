import { NestFactory } from '@nestjs/core';
import { WebsocketServerModule } from './websocket-server.module';

import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(WebsocketServerModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.enableCors({
    origin: process.env.PRODUCTION_ORIGIN,
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  await app.listen(parseInt(process.env.SERVER2_PORT) || 3001);
}
bootstrap();

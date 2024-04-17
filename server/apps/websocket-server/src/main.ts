import { NestFactory } from '@nestjs/core';
import { WebsocketServerModule } from './websocket-server.module';

import { ValidationPipe } from '@nestjs/common';

import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(WebsocketServerModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    }),
  );

  await app.listen(3001);
}
bootstrap();

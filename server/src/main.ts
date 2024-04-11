import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors();

  await app.listen(3000);
}
bootstrap();

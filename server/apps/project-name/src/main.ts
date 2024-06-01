import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
      allowedHeaders:
        'Origin, X-Requested-With, Content-Type, Accept, X-Header-Device_id',
    }),
  );

  await app.listen(3000);
}
bootstrap();

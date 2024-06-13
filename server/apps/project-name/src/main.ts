import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.enableCors({
    origin: process.env.PRODUCTION_ORIGIN,
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, X-Header-Device_id',
  });

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();

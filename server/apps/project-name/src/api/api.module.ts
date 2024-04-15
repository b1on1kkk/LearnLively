import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

import { join } from 'path';

import { JwtAuthGuard } from 'apps/project-name/src/api/guard/jwt.guard';
import { JwtStrategy } from 'apps/project-name/src/api/strategies/jwt.strategy';

import { MulterModule } from '@nestjs/platform-express';

import { SharedModule } from '@sharedService/shared';
import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';
import { Helpers } from './helpers/helpers';
import { PrismaModule } from '@prismaORM/prisma';

@Module({
  imports: [
    MulterModule.register({ dest: join(__dirname, '../../', 'avatars') }),
    MulterModule.register({ dest: join(__dirname, '../../', 'assets') }),
    SharedModule,
    PrismaModule,
  ],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    ApiService,
    ErrorCatcherInterceptor,
    Helpers,
  ],
  controllers: [ApiController],
  exports: [],
})
export class ApiModule {}

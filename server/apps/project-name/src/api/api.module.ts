import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

import { join } from 'path';

import { JwtAuthGuard } from 'apps/project-name/src/api/guard/jwt.guard';

import { MulterModule } from '@nestjs/platform-express';

import { SharedModule } from '@sharedService/shared';
import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';
import { Helpers } from './helpers/helpers';
import { PrismaModule } from '@prismaORM/prisma';
import { AuthResponseController } from 'libs/auth_response_controller/response.controller';

@Module({
  imports: [
    SharedModule,
    PrismaModule,
    MulterModule.register({ dest: join(__dirname, '../../', 'assets') }),
    MulterModule.register({ dest: join(__dirname, '../../', 'avatars') }),
  ],
  providers: [
    Helpers,
    ApiService,
    JwtAuthGuard,
    AuthResponseController,
    ErrorCatcherInterceptor,
  ],
  controllers: [ApiController],
  exports: [],
})
export class ApiModule {}

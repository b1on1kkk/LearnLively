import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { EmptyTokenGuard } from './guards/empty_token.guard';
import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';
import { SharedModule } from '@sharedService/shared';
import { PrismaModule } from '@prismaORM/prisma';

@Module({
  imports: [PassportModule, SharedModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, EmptyTokenGuard, ErrorCatcherInterceptor],
  exports: [],
})
export class AuthModule {}

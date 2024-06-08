import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmptyTokenGuard } from './guard/empty_token.guard';
import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';
import { SharedModule } from '@sharedService/shared';
import { PrismaModule } from '@prismaORM/prisma';
import { AuthResponseController } from 'libs/auth_response_controller/response.controller';
import { JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from './strategy/google-oauth.strategy';
import { ExternalAuthCatcherInterceptor } from '../../../../libs/interceptor/external-auth-catcher.interceptor';

@Module({
  imports: [SharedModule, PrismaModule],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
    EmptyTokenGuard,
    ErrorCatcherInterceptor,
    ExternalAuthCatcherInterceptor,
    AuthResponseController,
    GoogleStrategy,
  ],
  exports: [],
})
export class AuthModule {}

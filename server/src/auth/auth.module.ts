import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { PassportModule } from '@nestjs/passport';
import { EmptyTokenGuard } from './guards/empty_token.guard';
import { ErrorCatcherInterceptor } from './interceptors/error_catcher.interceptor';
import { SharedService } from 'src/api/helpers/SharedService.helper';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaClient,
    EmptyTokenGuard,
    ErrorCatcherInterceptor,
    JwtService,
    SharedService,
  ],
  exports: [],
})
export class AuthModule {}

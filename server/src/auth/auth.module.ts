import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { PassportModule } from '@nestjs/passport';
import { EmptyTokenGuard } from './guards/empty_token.guard';
import { ErrorCatcherInterceptor } from './interceptors/error_catcher.interceptor';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaClient,
    EmptyTokenGuard,
    ErrorCatcherInterceptor,
  ],
  exports: [],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmptyTokenGuard } from './guards/empty_token.guard';
import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';
import { SharedModule } from '@sharedService/shared';
import { PrismaModule } from '@prismaORM/prisma';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    SharedModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EmptyTokenGuard, ErrorCatcherInterceptor],
  exports: [],
})
export class AuthModule {}

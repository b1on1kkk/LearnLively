import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { SharedService } from './helpers/SharedService.helper';
import { ErrorCatcherInterceptor } from 'src/auth/interceptors/error_catcher.interceptor';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({ dest: join(__dirname, '../../', 'avatars') }),
    MulterModule.register({ dest: join(__dirname, '../../', 'assets') }),
  ],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    JwtService,
    PrismaClient,
    ApiService,
    SharedService,
    ErrorCatcherInterceptor,
  ],
  controllers: [ApiController],
})
export class ApiModule {}

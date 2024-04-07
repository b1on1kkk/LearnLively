import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { StudentsInterceptor } from './interceptors/students.interceptor';

@Module({
  imports: [],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    JwtService,
    PrismaService,
    StudentsInterceptor,
    ApiService,
  ],
  controllers: [ApiController],
})
export class ApiModule {}

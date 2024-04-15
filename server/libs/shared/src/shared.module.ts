import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [SharedService, JwtService, PrismaClient],
  exports: [SharedService, JwtService, PrismaClient],
})
export class SharedModule {}

import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '@prismaORM/prisma';

@Module({
  imports: [PrismaModule],
  providers: [SharedService, JwtService, PrismaClient],
  exports: [SharedService, JwtService, PrismaClient],
})
export class SharedModule {}

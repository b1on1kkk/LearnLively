import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService.onModuleInit();
  }
}

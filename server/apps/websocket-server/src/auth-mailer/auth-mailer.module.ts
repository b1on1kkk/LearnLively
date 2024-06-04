import { Module } from '@nestjs/common';
import { AuthMailerService } from './auth-mailer.service';
import { AuthMailerController } from './auth-mailer.controller';

@Module({
  controllers: [AuthMailerController],
  providers: [AuthMailerService],
})
export class AuthMailerModule {}

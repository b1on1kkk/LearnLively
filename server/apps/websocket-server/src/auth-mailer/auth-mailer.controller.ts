import { Body, Controller, Post } from '@nestjs/common';

import { AuthMailerService } from './auth-mailer.service';

import type { MailerDTO } from 'apps/websocket-server/dto/mailerDTO';

@Controller('auth-mailer')
export class AuthMailerController {
  constructor(private readonly authMailerService: AuthMailerService) {}

  @Post('/sender')
  async authMailSender(@Body() dto: MailerDTO) {
    return this.authMailerService.sendAuthMail(dto);
  }
}

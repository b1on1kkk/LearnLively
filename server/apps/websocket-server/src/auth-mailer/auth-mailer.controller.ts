import { Body, Controller, Post } from '@nestjs/common';

import { AuthMailerService } from './auth-mailer.service';

@Controller('auth-mailer')
export class AuthMailerController {
  constructor(private readonly authMailerService: AuthMailerService) {}

  @Post('/sender')
  async authMailSender(@Body() dto: any) {
    return this.authMailerService.sendAuthMail(dto);
  }
}

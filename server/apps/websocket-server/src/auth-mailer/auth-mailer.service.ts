import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

import { sendEmailOptions } from 'apps/websocket-server/utils/sendEmailOptions';

import type { MailerDTO } from 'apps/websocket-server/dto/mailerDTO';

import { TRANSPORTER_CONFIG } from '../../config/transport.config';

@Injectable()
export class AuthMailerService {
  public async sendAuthMail(dto: MailerDTO) {
    const { to } = dto;

    const transport = nodemailer.createTransport(TRANSPORTER_CONFIG);

    try {
      return await transport.sendMail(sendEmailOptions(to, ''));
    } catch (error) {
      console.log(error);
    }
  }
}

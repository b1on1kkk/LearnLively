import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

import { sendEmailOptions } from 'apps/websocket-server/utils/sendEmailOptions';

import { TRANSPORTER_CONFIG } from '../../config/transport.config';

@Injectable()
export class AuthMailerService {
  public async sendAuthMail(dto: any) {
    const { to } = dto;

    const transport = this.mailTransport();

    try {
      return await transport.sendMail(sendEmailOptions(to));
    } catch (error) {
      console.log(error);
    }
  }

  private mailTransport() {
    return nodemailer.createTransport(TRANSPORTER_CONFIG);
  }
}

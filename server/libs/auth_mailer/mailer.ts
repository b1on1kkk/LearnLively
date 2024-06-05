import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { TRANSPORTER_CONFIG } from 'apps/websocket-server/config/transport.config';
import { sendEmailOptions } from 'apps/project-name/src/auth/utils/sendEmailOptions';

interface AuthMailerDTO {
  to: string;
  user_id: number;
  device_id: string;
}

@Injectable()
export class AuthMailer {
  constructor(
    private readonly jwtService: JwtService,
    private readonly credentials: AuthMailerDTO,
  ) {}

  public async sendAuthMail() {
    const transport = nodemailer.createTransport(TRANSPORTER_CONFIG);

    const token = this.jwtService.sign(
      {
        user_id: this.credentials.user_id,
        device_id: this.credentials.device_id,
      },
      { secret: process.env.JWT_AUTH_MAIL_TOKEN, expiresIn: '2h' },
    );

    try {
      return await transport.sendMail(
        sendEmailOptions(this.credentials.to, token),
      );
    } catch (error) {
      console.log(error);
    }
  }
}

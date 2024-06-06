import * as nodemailer from 'nodemailer';

import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { sendEmailOptions } from 'apps/project-name/src/auth/utils/sendEmailOptions';

import type { AuthMailerDTO } from 'apps/project-name/src/auth/dto/authMailer.dto';

import { TRANSPORTER_CONFIG } from 'apps/websocket-server/config/transport.config';

@Injectable()
export class AuthMailer {
  constructor(
    private readonly jwtService: JwtService,
    private readonly credentials: AuthMailerDTO,
  ) {}

  public async sendAuthMail() {
    const transport = nodemailer.createTransport(TRANSPORTER_CONFIG);

    // generate token with specific information
    const token = this.jwtService.sign(
      {
        user_id: this.credentials.user_id,
        device_id: this.credentials.device_id,
        remember_me: this.credentials.remember_me,
      },
      {
        secret: process.env.JWT_AUTH_MAIL_TOKEN,
        expiresIn: process.env.JWT_MAIL_VERIFICATION_TOKEN_EXP,
      },
    );

    try {
      return await transport.sendMail(
        sendEmailOptions(this.credentials.to, token),
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

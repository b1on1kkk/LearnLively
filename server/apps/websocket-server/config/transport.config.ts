import * as nodemailer from 'nodemailer';

export const TRANSPORTER_CONFIG = {
  service: process.env.MAIL_SERVICE,
  host: process.env.HOST_TYPE,
  port: 465,
  secure: true,
  logger: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
} as nodemailer.TransportOptions;

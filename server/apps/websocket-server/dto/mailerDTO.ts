import { IsString } from 'class-validator';

export class MailerDTO {
  @IsString()
  to: string;
}

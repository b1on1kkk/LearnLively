import { IsString } from 'class-validator';

export class LoginPayloadDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  remember_me: string;
}

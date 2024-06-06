import { IsString } from 'class-validator';

export class SignUpDTO {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  surname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  remember_me: string;
}

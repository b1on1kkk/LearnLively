import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginPayloadDTO } from './dto/login_payload.dto';
import { AuthService } from './auth.service';

import { Response } from 'express';
import { EmptyTokenGuard } from './guards/empty_token.guard';
import { SignUpDTO } from './dto/signup_payload.dto';
import { ErrorCatcherInterceptor } from './interceptors/error_catcher.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @UseGuards(EmptyTokenGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async login(@Body() authPayload: LoginPayloadDTO, @Res() res: Response) {
    const token = await this.authService.login(authPayload);

    return res
      .cookie('jwt_lg', token, {
        httpOnly: true,
        maxAge: 259200000,
      })
      .json({ text: 'Logged in!', status: 200 });
  }

  @HttpCode(200)
  @Post('signup')
  @UseGuards(EmptyTokenGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async signup(@Body() authPayload: SignUpDTO, @Res() res: Response) {
    const token = await this.authService.signup(authPayload);

    return res
      .cookie('jwt_lg', token, {
        httpOnly: true,
        maxAge: 259200000,
      })
      .json({ text: 'Logged in!', status: 200 });
  }
}

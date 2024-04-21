import { Response, Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { EmptyTokenGuard } from './guards/empty_token.guard';

import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';

import type { LoginPayloadDTO } from './dto/login_payload.dto';
import type { SignUpDTO } from './dto/signup_payload.dto';

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

  @HttpCode(200)
  @Delete('logout')
  @UseInterceptors(ErrorCatcherInterceptor)
  async logout(@Req() req: Request, @Res() res: Response) {
    return res
      .clearCookie('jwt_lg', {
        httpOnly: true,
        secure: true,
      })
      .json(await this.authService.logout(req.cookies));
  }
}
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

import type { SignUpDTO } from './dto/signup_payload.dto';
import type { LoginPayloadDTO } from './dto/login_payload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @UseGuards(EmptyTokenGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async login(
    @Body() authPayload: LoginPayloadDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const payload = await this.authService.login(authPayload, req);

    return res
      .cookie('access', payload.tokens.access, {
        httpOnly: true,
        maxAge: 30000, // alive 30s
        sameSite: 'strict',
      })
      .cookie('refresh', payload.tokens.refresh, {
        httpOnly: true,
        maxAge: 86400000, // alive 1d
        sameSite: 'strict',
      })
      .json({
        message: 'User created!',
        payload: { device_id: payload.device_id },
        status: 200,
      });
  }

  @HttpCode(200)
  @Post('signup')
  @UseGuards(EmptyTokenGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async signup(
    @Body() authPayload: SignUpDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const payload = await this.authService.signup(authPayload, req);

    return res
      .cookie('access', payload.tokens.access, {
        httpOnly: true,
        maxAge: 30000, // alive 30s
        sameSite: 'strict',
      })
      .cookie('refresh', payload.tokens.refresh, {
        httpOnly: true,
        maxAge: 86400000, // alive 1d
        sameSite: 'strict',
      })
      .json({
        message: 'User created!',
        payload: { device_id: payload.device_id },
        status: 200,
      });
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

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { EmptyTokenGuard } from './guard/empty_token.guard';

import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';
import { AuthResponseController } from 'libs/auth_response_controller/response.controller';

import type { Response, Request } from 'express';

import type { SignUpDTO } from './dto/signup_payload.dto';
import type { LoginPayloadDTO } from './dto/login_payload.dto';

import type { ResponsePayload } from './interfaces/registrationPayload';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseController: AuthResponseController,
  ) {}

  @HttpCode(200)
  @Get('verify')
  @UseInterceptors(ErrorCatcherInterceptor)
  async verify(
    @Req() req: Request,
    @Res() res: Response,
    @Query() search: { token: string },
  ) {
    const payload = await this.authService.verify(search.token, req);

    console.log(payload);

    if (payload.status) {
      return res
        .cookie('access', payload.tokes.access, {
          httpOnly: true,
          maxAge: 3600000, // alive 1h
          sameSite: 'strict',
          secure: true,
        })
        .cookie('refresh', payload.tokes.refresh, {
          httpOnly: true,
          maxAge: 86400000, // alive 1d
          sameSite: 'strict',
          secure: true,
        })
        .send(payload.message);
    }

    return res.send(payload.message);
  }

  @HttpCode(200)
  @Post('login')
  @UseGuards(EmptyTokenGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async login(
    @Body() authPayload: LoginPayloadDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const payload: ResponsePayload = await this.authService.login(
      authPayload,
      req,
    );

    const message = {
      message: 'Logged in!',
      payload: { device_id: payload.device_id },
      status: 200,
    };

    return this.responseController.successfulResponse(
      res,
      payload.tokens,
      message,
    );
  }

  @HttpCode(200)
  @Post('signup')
  @UseGuards(EmptyTokenGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async signup(@Res() res: Response, @Body() authPayload: SignUpDTO) {
    const payload = await this.authService.signup(authPayload);

    const message = {
      message: 'Account created!',
      payload: { device_id: payload.device_id },
      status: 200,
    };

    return res.json(message);
  }

  @HttpCode(200)
  @Delete('logout')
  @UseInterceptors(ErrorCatcherInterceptor)
  async logout(@Req() req: Request, @Res() res: Response) {
    return this.responseController.successfulLoggedOut(
      res,
      await this.authService.logout(req),
    );
  }
}

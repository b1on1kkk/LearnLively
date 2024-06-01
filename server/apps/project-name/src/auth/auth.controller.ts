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

    return this.responseController.successfulReponse(res, payload, message);
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
    const payload: ResponsePayload = await this.authService.signup(
      authPayload,
      req,
    );

    const message = {
      message: 'Logged in!',
      payload: { device_id: payload.device_id },
      status: 200,
    };

    return this.responseController.successfulReponse(res, payload, message);
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

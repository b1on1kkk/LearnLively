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
import type { VerificationQueryDTO } from './dto/verification_query.dto';

import type { ResponsePayload } from './interfaces/registrationPayload';
import { successfulVerifyPayload } from './interfaces/successfulVerifyPayload.interface';

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
    @Query() search: VerificationQueryDTO,
  ) {
    const payload: successfulVerifyPayload = await this.authService.verify(
      search.token,
      req,
    );

    // if user was verificated
    if (payload.status) {
      return this.responseController.successfulVerification(res, payload);
    }

    // otherwise send message
    return res.send(payload.message);
  }

  @HttpCode(200)
  @Post('login')
  @UseGuards(EmptyTokenGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async login(
    @Res() res: Response,
    @Req() req: Request,
    @Body() authPayload: LoginPayloadDTO,
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

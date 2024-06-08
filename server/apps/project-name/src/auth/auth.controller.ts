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
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { EmptyTokenGuard } from './guard/empty_token.guard';

import { GetGoogleAuth } from './lib/getGoogleAuthType.lib';

import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';
import { AuthResponseController } from 'libs/auth_response_controller/response.controller';

import type { Response, Request } from 'express';

import type { SignUpDTO } from './dto/signup_payload.dto';
import type { LoginPayloadDTO } from './dto/login_payload.dto';
import type { VerificationQueryDTO } from './dto/verification_query.dto';

import type { ResponsePayload } from './interfaces/registrationPayload';
import type { GoogleAuthUserPayload } from './interfaces/googleAuthUserPayload.interface';
import type { successfulVerifyPayload } from './interfaces/successfulVerifyPayload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseController: AuthResponseController,
  ) {}

  /////////////////////////////////////GOOGLE AUTH/////////////////////////////////////////

  @Get('google')
  googleAuth(@Query('auth_type') query: string, @Res() res: Response) {
    const { type }: { type: 'signup' | 'login' } = JSON.parse(query);
    GetGoogleAuth.setType(type);

    return res.redirect('/auth/google/callback');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as GoogleAuthUserPayload;

    if (user) GetGoogleAuth.setUser(user);

    switch (GetGoogleAuth.getType()) {
      case 'login':
        return res.redirect('/auth/google/login');
      case 'signup':
        return res.redirect('/auth/google/signup');
      default:
        return res.redirect(
          `${process.env.CLIENT_ROOT_DOMAIN}registration/login`,
        );
    }
  }

  @Get('google/login')
  async googleLogin(@Req() req: Request, @Res() res: Response) {
    const payload = await this.authService.googleLogin(
      req,
      GetGoogleAuth.getUser(),
    );

    return res
      .cookie('access', payload.tokens.access, {
        httpOnly: true,
        maxAge: 3600000, // alive 1h
        sameSite: 'strict',
        secure: true,
      })
      .cookie('refresh', payload.tokens.refresh, {
        httpOnly: true,
        maxAge: 86400000, // alive 1d
        sameSite: 'strict',
        secure: true,
      })
      .redirect(process.env.CLIENT_ROOT_DOMAIN);
  }

  @Get('google/signup')
  async googleSignup(@Req() req: Request, @Res() res: Response) {
    const payload = await this.authService.googleSignup(
      req,
      GetGoogleAuth.getUser(),
    );

    return res
      .cookie('access', payload.tokens.access, {
        httpOnly: true,
        maxAge: 3600000, // alive 1h
        sameSite: 'strict',
        secure: true,
      })
      .cookie('refresh', payload.tokens.refresh, {
        httpOnly: true,
        maxAge: 86400000, // alive 1d
        sameSite: 'strict',
        secure: true,
      })
      .redirect(process.env.CLIENT_ROOT_DOMAIN);
  }

  /////////////////////////////////////GOOGLE AUTH/////////////////////////////////////////

  /////////////////////////////////////BASIC AUTH//////////////////////////////////////////

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

  /////////////////////////////////////BASIC AUTH//////////////////////////////////////////
}

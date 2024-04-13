import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginPayloadDTO } from './dto/login_payload.dto';
import { AuthService } from './auth.service';

import { Response, Request } from 'express';
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

  // just for testing
  @HttpCode(200)
  @Get('user')
  @UseInterceptors(ErrorCatcherInterceptor)
  async getUser(@Req() req: Request, @Res() res: Response) {
    const data = await this.authService.getUser(req.cookies);

    if (data) {
      return res
        .cookie('jwt_lg', data.new_token, {
          httpOnly: true,
          maxAge: 259200000,
        })
        .json({ user: data.user, result: true });
    }

    return res.json({ user: {}, result: false });
  }
}

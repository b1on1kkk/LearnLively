import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { EncodedJwt } from './interfaces/encoded_jwt.interface';
import { ApiService } from './api.service';
import { SharedService } from './helpers/SharedService.helper';
import { ErrorCatcherInterceptor } from 'src/auth/interceptors/error_catcher.interceptor';

@Controller('api')
export class ApiController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
  ) {}

  /////////////////////////GET/////////////////////////

  @Get('students')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getUsers(@Req() req: Request, @Res() res: Response) {
    const encoded_values: EncodedJwt = await this.jwtService.decode(
      req.cookies.jwt_lg,
    );

    return res
      .cookie('jwt_lg', this.sharedService.getCookie(), {
        httpOnly: true,
        maxAge: 259200000,
      })
      .json(await this.apiService.getUsers(encoded_values.id));
  }

  @Get('chats')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getChats(@Req() req: Request) {
    const encoded_values: EncodedJwt = await this.jwtService.decode(
      req.cookies.jwt_lg,
    );
    return await this.apiService.getChats(encoded_values.id);
  }

  // will be added after frontend part
}

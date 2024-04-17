import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtAuthGuard } from './guard/jwt.guard';

import { ApiService } from './api.service';

import { Helpers } from './helpers/helpers';
import { SharedService } from '@sharedService/shared/shared.service';
import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';

import type { EncodedJwt } from './interfaces/encoded_jwt.interface';
import type { FriendRequestDTO } from './interfaces/friendRequest.interface';

@Controller('api')
export class ApiController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sharedService: SharedService,
    private readonly helpers: Helpers,

    private readonly apiService: ApiService,
  ) {}

  /////////////////////////GET/////////////////////////

  @Get('user')
  @UseInterceptors(ErrorCatcherInterceptor)
  async getUser(@Req() req: Request, @Res() res: Response) {
    const data = await this.apiService.getUser(req.cookies);

    if (data) {
      return res
        .cookie('jwt_lg', data.token, {
          httpOnly: true,
          maxAge: 259200000,
        })
        .json({ user: data.user, result: true });
    }

    return res.json({ user: {}, result: false });
  }

  @Get('avatars/:image_name')
  async getAvatar(@Param('image_name') filename: string, @Res() res: Response) {
    try {
      const filePath = `./avatars/${filename}`;

      const existanceResponse = await this.helpers.fileExistsChecker(filePath);

      if (!existanceResponse) {
        throw new NotFoundException('Image does not exist!');
      }

      res.sendFile(filePath, { root: '.' });
    } catch (error) {
      return res.status(404).json({ text: 'Image is not exist!', status: 404 });
    }
  }

  @Get('pictures/:image_name')
  async getPictures(
    @Param('image_name') filename: string,
    @Res() res: Response,
  ) {
    try {
      const filePath = `./assets/${filename}`;

      const existanceResponse = await this.helpers.fileExistsChecker(filePath);

      if (!existanceResponse) {
        throw new NotFoundException('Image does not exist!');
      }

      res.sendFile(filePath, { root: '.' });
    } catch (error) {
      return res.status(404).json({ text: 'Image is not exist!', status: 404 });
    }
  }

  @Get('students')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getStudents(@Req() req: Request, @Res() res: Response) {
    const encoded_values: EncodedJwt = await this.jwtService.decode(
      req.cookies.jwt_lg,
    );

    return res
      .cookie('jwt_lg', this.sharedService.getCookie(), {
        httpOnly: true,
        maxAge: 259200000,
      })
      .json(await this.apiService.getStudents(encoded_values.id));
  }

  /////////////////////////POST/////////////////////////

  @HttpCode(200)
  @Post('friend_request')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async sendFriendRequest(
    @Body() student: FriendRequestDTO,
    @Res() res: Response,
  ) {
    return res.json(await this.apiService.sendFriendRequest(student));
  }
}

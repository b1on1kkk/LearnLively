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
import { AuthResponseController } from 'libs/auth_response_controller/response.controller';

@Controller('api')
export class ApiController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sharedService: SharedService,
    private readonly helpers: Helpers,
    private readonly reponseController: AuthResponseController,

    private readonly apiService: ApiService,
  ) {}

  /////////////////////////GET/////////////////////////

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

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getUser(@Req() req: Request, @Res() res: Response) {
    const data = await this.apiService.getUser(req);

    if (data && data.update) {
      return this.reponseController.successfulReponse(
        res,
        { tokens: data.tokens },
        { user: data.user, result: true },
      );
    } else if (data && !data.update) {
      return res.json({ user: data.user, result: true });
    }

    return res.json({ user: null, result: false });
  }

  @Get('students')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getStudents(@Req() req: Request, @Res() res: Response) {
    const data = await this.apiService.getStudents(req);

    if (data && data.update) {
      return this.reponseController.successfulReponse(
        res,
        { tokens: data.tokens },
        data.students,
      );
    }
    return res.json(data.students);
  }

  // NEXT DOWN CONTINUE IMPROVING....

  @Get('private_chats')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getChats(@Req() req: Request, @Res() res: Response) {
    const { access, refresh } = req.cookies;

    const encoded_values: EncodedJwt = await this.jwtService.decode(
      access || refresh,
    );

    return res
      .cookie('jwt_lg', this.sharedService.getCookie(), {
        httpOnly: true,
        maxAge: 259200000,
      })
      .json(await this.apiService.getChats(encoded_values.user_id));
  }

  @Get('group_chats')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getGroupChats(@Req() req: Request, @Res() res: Response) {
    const { access, refresh } = req.cookies;

    const encoded_values: EncodedJwt = await this.jwtService.decode(
      access || refresh,
    );

    return res
      .cookie('jwt_lg', this.sharedService.getCookie(), {
        httpOnly: true,
        maxAge: 259200000,
      })
      .json(await this.apiService.getGroupChats(encoded_values.user_id));
  }

  @HttpCode(200)
  @Post('messages')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getMessages(@Body() body: { conv_id: number }, @Res() res: Response) {
    return res
      .cookie('jwt_lg', this.sharedService.getCookie(), {
        httpOnly: true,
        maxAge: 259200000,
      })
      .json(await this.apiService.getMessages(body.conv_id));
  }

  @HttpCode(200)
  @Post('seen_message')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getSeenMessages(
    @Body() body: { message_id: number; user_id: number },
    @Res() res: Response,
  ) {
    return res
      .cookie('jwt_lg', this.sharedService.getCookie(), {
        httpOnly: true,
        maxAge: 259200000,
      })
      .json(await this.apiService.getSeenMessages(body));
  }
}

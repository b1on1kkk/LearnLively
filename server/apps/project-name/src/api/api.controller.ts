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
import { ErrorCatcherInterceptor } from 'libs/interceptor/error-catcher.interceptor';

import { AuthResponseController } from 'libs/auth_response_controller/response.controller';
import { RegistrationAuthGuard } from './guard/registration_auth.guard';
import { EncodedJwt } from './interfaces/encoded_jwt.interface';

@Controller('api')
export class ApiController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly helpers: Helpers,
    private readonly reponseController: AuthResponseController,

    private readonly apiService: ApiService,
  ) {}

  /////////////////////////GET/////////////////////////

  @HttpCode(200)
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

  @HttpCode(200)
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

  @HttpCode(200)
  @Get('user')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getUser(@Req() req: Request, @Res() res: Response) {
    const data = await this.apiService.getUser(req);

    if (data && data.update) {
      return this.reponseController.successfulResponse(res, data.tokens, {
        user: data.user,
        result: true,
      });
    } else if (data && !data.update) {
      return res.json({ user: data.user, result: true });
    }

    return res.json({ user: null, result: false });
  }

  @HttpCode(200)
  @Get('students')
  @UseGuards(RegistrationAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getStudents(@Req() req: Request, @Res() res: Response) {
    return res.json(await this.apiService.getStudents(req));
  }

  @HttpCode(200)
  @Get('private_chats')
  @UseGuards(RegistrationAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getChats(@Req() req: Request, @Res() res: Response) {
    return res.json(await this.apiService.getChats(req));
  }

  @HttpCode(200)
  @Get('group_chats')
  @UseGuards(RegistrationAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getGroupChats(@Req() req: Request, @Res() res: Response) {
    const { access } = req.cookies;
    const decoded: EncodedJwt = this.jwtService.decode(access);

    return res.json(await this.apiService.getGroupChats(decoded.user_id));
  }

  @HttpCode(200)
  @Post('messages')
  @UseGuards(RegistrationAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getMessages(@Body() body: { conv_id: number }, @Res() res: Response) {
    return res.json(await this.apiService.getMessages(body.conv_id));
  }

  @HttpCode(200)
  @Post('seen_message')
  @UseGuards(RegistrationAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getSeenMessages(
    @Body() body: { message_id: number; user_id: number },
    @Res() res: Response,
  ) {
    return res.json(await this.apiService.getSeenMessages(body));
  }
}

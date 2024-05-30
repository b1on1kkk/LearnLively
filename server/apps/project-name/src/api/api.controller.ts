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
// import type { Message } from './interfaces/message.interface';

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

    return res.json({ user: null, result: false });
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

  @Get('private_chats')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getChats(@Req() req: Request, @Res() res: Response) {
    const encoded_values: EncodedJwt = await this.jwtService.decode(
      req.cookies.jwt_lg,
    );

    return res
      .cookie('jwt_lg', this.sharedService.getCookie(), {
        httpOnly: true,
        maxAge: 259200000,
      })
      .json(await this.apiService.getChats(encoded_values.id));
  }

  @Get('group_chats')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorCatcherInterceptor)
  async getGroupChats(@Req() req: Request, @Res() res: Response) {
    const encoded_values: EncodedJwt = await this.jwtService.decode(
      req.cookies.jwt_lg,
    );

    return res
      .cookie('jwt_lg', this.sharedService.getCookie(), {
        httpOnly: true,
        maxAge: 259200000,
      })
      .json(await this.apiService.getGroupChats(encoded_values.id));
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

  // @HttpCode(200)
  // @Post('user_seen_message')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(ErrorCatcherInterceptor)
  // async addUserSeenMessage(
  //   @Body() body: { messages: Array<Message>; user_id: number },
  //   @Res() res: Response,
  // ) {
  //   return res
  //     .cookie('jwt_lg', this.sharedService.getCookie(), {
  //       httpOnly: true,
  //       maxAge: 259200000,
  //     })
  //     .json(
  //       await this.apiService.addUserSeenMessage(body.messages, body.user_id),
  //     );
  // }
}

import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { EncodedJwt } from './interfaces/encoded_jwt.interface';
import { ApiService } from './api.service';
import { StudentsInterceptor } from './interceptors/students.interceptor';
import type { Students } from './interfaces/students.interface';

@Controller('api')
export class ApiController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly apiService: ApiService,
  ) {}

  /////////////////////////GET/////////////////////////

  @Get('students')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(StudentsInterceptor)
  async getUsers(@Req() req: Request): Promise<Students[]> {
    const encoded_values: EncodedJwt = await this.jwtService.decode(
      req.cookies.jwt_lg,
    );

    return await this.apiService.getUsers(encoded_values.id);
  }

  @Get('chats')
  @UseGuards(JwtAuthGuard)
  async getChats(@Req() req: Request) {
    const encoded_values: EncodedJwt = await this.jwtService.decode(
      req.cookies.jwt_lg,
    );
    return await this.apiService.getChats(encoded_values.id);
  }

  // will be added after frontend part
}

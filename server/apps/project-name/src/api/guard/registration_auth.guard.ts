import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import type { Request } from 'express';

@Injectable()
export class RegistrationAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const { access } = request.cookies;

    // if access token does not exist - throw error
    if (!access) return false;

    // verify, if ok - move on, otherwise - throw error
    try {
      this.jwtService.verify(access, { secret: process.env.JWT_ACCESS_TOKEN });
      return true;
    } catch (error) {
      return false;
    }
  }
}

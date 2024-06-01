import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import type { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const { access, refresh } = request.cookies;

    if (!access && !refresh) return false;

    if (!access && refresh) {
      try {
        this.jwtService.verify(refresh, {
          secret: process.env.JWT_REFRESH_TOKEN,
        });

        return true;
      } catch (error) {
        return false;
      }
    }

    if ((access && refresh) || (access && !refresh)) {
      try {
        this.jwtService.verify(access, {
          secret: process.env.JWT_ACCESS_TOKEN,
        });

        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    }

    return false;
  }
}

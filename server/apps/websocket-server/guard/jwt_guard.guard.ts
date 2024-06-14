import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { Socket } from 'socket.io';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuardGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('socket guard worked!');

    console.log(
      context.switchToWs().getClient<Socket>().handshake.headers.cookie,
    );

    const cookies = this.decodeCookie(
      context.switchToWs().getClient<Socket>().handshake.headers.cookie,
    );

    console.log(cookies, '--------------');

    if (cookies) {
      try {
        this.jwtService.verify(cookies.access, {
          secret: process.env.JWT_ACCESS_TOKEN,
        });
        return true;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }

    throw new UnauthorizedException();
  }

  private decodeCookie(cookie: string | undefined) {
    if (cookie) {
      const cookies = cookie.split(';');

      const result: { [key: string]: string } = {};

      cookies.forEach((cookie) => {
        const splitted_cookie = cookie.trim().split('=');

        result[splitted_cookie[0]] = splitted_cookie[1];
      });

      return result;
    }

    return undefined;
  }
}

import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class EmptyTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (Object.keys(request.cookies).includes('jwt_lg')) {
      try {
        this.jwtService.verify(request.cookies['jwt_lg'], {
          secret: process.env.JWT_SECRET_KEY,
        });
      } catch (error) {
        throw new HttpException(
          'Your jwt token is not valid or forged. Delete this token!',
          HttpStatus.FORBIDDEN,
        );
      }

      throw new HttpException(
        'You are already logged in!',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}

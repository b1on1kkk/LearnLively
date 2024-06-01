import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { Request } from 'express';

@Injectable()
export class EmptyTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();

    if (this.authTokensExistance(request)) {
      throw new HttpException(
        'Manipulations with tokens are illegal!',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }

  private authTokensExistance(req: Request) {
    return (
      Object.keys(req.cookies).includes('access') ||
      Object.keys(req.cookies).includes('refresh')
    );
  }
}

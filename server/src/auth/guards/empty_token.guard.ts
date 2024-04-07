import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class EmptyTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: { [key: string]: string } = context
      .switchToHttp()
      .getRequest();
    const cookies = Object.values(request.cookies);

    if (cookies.length > 0) {
      try {
        cookies.forEach((cookie) => {
          if (cookie.split('.').length === 3 && this.jwtService.verify(cookie))
            throw new Error();
        });
      } catch (error) {
        throw new HttpException(
          'Sorry, but your jwt token is not valid/forged or you logged in already',
          HttpStatus.FORBIDDEN,
        );
      }
    }

    return true;
  }
}

import {
  CallHandler,
  HttpException,
  HttpStatus,
  Injectable,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ExternalAuthCatcherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: HttpException | PrismaClientKnownRequestError) => {
        const response = context.switchToHttp().getResponse<Response>();

        // redirect user back to registration page if error occured
        response.redirect(process.env.CLIENT_REGISTRATION_ROUTE);

        // throw some errors
        if (this.isHttpExceptionError(err)) {
          return throwError(
            () => new HttpException(err.message, err.getStatus()),
          );
        }

        return throwError(
          () =>
            new HttpException(
              'Something serious went wrong, we will fix it soon :)',
              HttpStatus.SERVICE_UNAVAILABLE,
            ),
        );
      }),
    );
  }

  private isHttpExceptionError(
    err: HttpException | PrismaClientKnownRequestError,
  ): err is HttpException {
    return err instanceof HttpException;
  }
}

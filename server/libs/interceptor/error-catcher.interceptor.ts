import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorCatcherInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err: HttpException | PrismaClientKnownRequestError) => {
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

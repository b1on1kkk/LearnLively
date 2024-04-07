import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Students } from '../interfaces/students.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StudentsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<Students[]>,
  ): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(
        map((data) =>
          data.map((student) => plainToInstance(Students, student)),
        ),
      );
  }
}

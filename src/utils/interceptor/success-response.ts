import { Logger } from '@/utils/logger';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, map } from 'rxjs';

interface Data<T> {
  data: T;
}

@Injectable()
export class SuccessResponse<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Data<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        const res = { data, code: 0, message: '成功', success: true };

        const logFormat = `Request original url: ${request.originalUrl}
 Method: ${request.method}
 IP: ${request.ip}
 User: ${request.get('User-Agent')}
 Status code: ${response.statusCode}
 Parmas: ${JSON.stringify(request.params)}
 Query: ${JSON.stringify(request.query)}
 Body: ${JSON.stringify(request.body)}
 Response data:\n ${JSON.stringify(res)}`;

        Logger.info(logFormat);
        Logger.access(logFormat);
        return res;
      }),
    );
  }
}

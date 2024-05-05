import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { Logger } from '../logger';

@Catch()
export class AllExceptionFilter implements ExceptionFilter<Error> {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const data =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message;
    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const result = {
      data,
      code,
      message: exception.message,
      success: false,
    };

    // 记录日志
    const logFormat = `Request original url: ${request.originalUrl}
 Method: ${request.method}
 IP: ${request.ip}
 Response status: ${response.statusCode}
 Response code: ${code}
 Message: ${exception.message}
 User: ${request.get('User-Agent')}
 Parmas: ${JSON.stringify(request.params)}
 Query: ${JSON.stringify(request.query)}
 Body: ${JSON.stringify(request.body)}
 Error:\n ${JSON.stringify(exception)}
 Response data:\n ${JSON.stringify(result)}`;
    Logger.error(logFormat);

    response.json(result);
  }
}

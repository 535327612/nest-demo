import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CommonException } from '../normal-exception';

@Catch(CommonException)
export class CommonExceptionFilter implements ExceptionFilter<CommonException> {
  catch(exception: CommonException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.json({
      data: null,
      code: status,
      message: exception.message,
      success: false,
    });
  }
}

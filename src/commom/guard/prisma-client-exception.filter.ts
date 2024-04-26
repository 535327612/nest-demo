import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter
  implements ExceptionFilter<Prisma.PrismaClientKnownRequestError>
{
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    switch (exception.code) {
      case 'P2002': {
        // 不满足唯一约束
        const message = exception.meta.target + '重复';
        response.json({
          data: null,
          code: HttpStatus.CONFLICT,
          msg: message,
          success: false,
        });
        break;
      }
      case 'P2025': {
        response.json({
          data: null,
          code: HttpStatus.CONFLICT,
          msg: '记录未找到',
          success: false,
        });
        break;
      }
      default: {
        const message = exception.message.replace(/\n/g, '');

        response.json({
          data: null,
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          msg: message,
          success: false,
        });
        break;
      }
    }
  }
}

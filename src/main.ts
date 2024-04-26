import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SuccessResponse } from './commom/success-response';
import { PrismaClientExceptionFilter } from './commom/guard/prisma-client-exception.filter';
import { HttpExceptionFilter } from './commom/guard/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 注册数据校验
  app.useGlobalPipes(new ValidationPipe());
  // 注册prisma错误过滤器
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  // 统一响应拦截器
  app.useGlobalInterceptors(new SuccessResponse());
  // 跨域
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', process.env.JWT_FLAG],
    exposedHeaders: [process.env.JWT_FLAG],
  });
  await app.listen(5000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { JwtFlag } from './constants';
import { AppModule } from './app.module';
import { SuccessResponse } from './commom/success-response';
import { PrismaClientExceptionFilter } from './commom/prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 注册数据校验
  app.useGlobalPipes(new ValidationPipe());
  // 注册prisma错误过滤器
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  // 统一响应拦截器
  app.useGlobalInterceptors(new SuccessResponse());
  // 跨域
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', JwtFlag],
    exposedHeaders: [JwtFlag],
  });
  await app.listen(5000);
}
bootstrap();

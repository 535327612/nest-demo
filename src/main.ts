import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SuccessResponse } from './utils/interceptor/success-response';
import { PrismaClientExceptionFilter } from './utils/filter/prisma-client-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './utils/filter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('nest项目文档')
    .setDescription('nest-demo api预览')
    .addSecurity('token', {
      type: 'apiKey',
      in: 'header',
      name: 'token',
    })
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  // 注册prisma错误过滤器
  app.useGlobalFilters(
    new AllExceptionFilter(),
    new PrismaClientExceptionFilter(),
  );
  // app.use(loggerMiddleware);
  // 统一响应拦截器
  app.useGlobalInterceptors(new SuccessResponse());
  // 注册数据校验
  app.useGlobalPipes(new ValidationPipe());
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

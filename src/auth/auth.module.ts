import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtSecret } from '@/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/commom/guard/auth.guard';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: AuthGuard }, // 全局权限守卫
  ],
})
export class AuthModule {}

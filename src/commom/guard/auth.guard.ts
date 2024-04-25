import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 判断是否是公共接口
    const isPublic = this.reflector.get<boolean>(
      process.env.IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const requset = context.switchToHttp().getRequest<Request>();
    const token = requset.get(process.env.JWT_FLAG);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const response = context.switchToHttp().getResponse<Response>();

      const newToken = this.jwtService.sign({
        id: payload.id,
        name: payload.name,
      });
      response.append(process.env.JWT_FLAG, newToken);
    } catch (e: any) {
      console.log(e);
      throw new UnauthorizedException();
    }
    return true;
  }
}

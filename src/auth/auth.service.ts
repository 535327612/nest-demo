import { Injectable, UnauthorizedException } from '@nestjs/common';
import { calculateMD5 } from '@/utils';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const hashPwd = calculateMD5(loginUserDto.password);
    const users = await this.prismaService.user.findMany({
      where: { password: hashPwd, name: loginUserDto.name },
    });

    if (users.length > 0) {
      const payload = { id: users[0].id, name: users[0].name };
      const token = this.jwtService.sign(payload);
      return token;
    } else {
      throw new UnauthorizedException('用户名或密码错误');
    }
  }
}

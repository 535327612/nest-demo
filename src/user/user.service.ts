import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashPwd = crypto
        .createHash('md5')
        .update(createUserDto.password)
        .digest('hex');
      createUserDto.password = hashPwd;

      const result = await this.prismaService.user.create({
        data: createUserDto,
      });
      return result;
    } catch (e: any) {
      console.log(e);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const hashPwd = crypto
      .createHash('md5')
      .update(loginUserDto.password)
      .digest('hex');
    const users = await this.prismaService.user.findMany({
      where: { password: hashPwd, name: loginUserDto.name },
    });
    if (users.length > 0) {
      return '登录成功';
    } else {
      return '登录失败';
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user ${updateUserDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

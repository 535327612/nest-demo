import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { calculateMD5 } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = calculateMD5(createUserDto.password);

    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const hashPwd = calculateMD5(loginUserDto.password);

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
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user.findMany({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = calculateMD5(updateUserDto.password);
    }

    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}

import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '名称必填' })
  @MinLength(2, { message: '名称最小程度：2' })
  name: string;

  @IsNotEmpty({ message: '密码必填' })
  password: string;

  email?: string;
}

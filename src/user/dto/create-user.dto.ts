import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUserDto {
  @IsNotEmpty({ message: '名称必填' })
  @MinLength(2, { message: '名称最小程度：2' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: '密码必填' })
  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  email?: string;
}

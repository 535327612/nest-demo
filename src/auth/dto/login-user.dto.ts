import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ required: true, description: '用户姓名', type: 'string' })
  name: string;

  @ApiProperty()
  password: string;
}

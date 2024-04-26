import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendMailDto {
  @IsNotEmpty({ message: '收件人必填' })
  @IsEmail(undefined, { message: '收件人格式错误' })
  to: string;

  @IsNotEmpty({ message: '主题必填' })
  subject: string;

  @IsNotEmpty({ message: '内容必填' })
  text: string;
}

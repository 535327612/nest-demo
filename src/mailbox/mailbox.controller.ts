import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail';
import { MailboxService } from './mailbox.service';

@ApiTags('邮箱接口')
@Controller('mailbox')
export class MailboxController {
  constructor(private readonly mailboxService: MailboxService) {}

  @Post()
  @ApiOperation({ summary: '发送邮件' })
  sendMail(@Body() sendMailDto: SendMailDto) {
    return this.mailboxService.send(sendMailDto);
  }
}

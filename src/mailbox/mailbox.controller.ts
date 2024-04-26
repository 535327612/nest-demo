import { Body, Controller, Post } from '@nestjs/common';
import { MailboxService } from './mailbox.service';
import { SendMailDto } from './dto/send-mail';

@Controller('mailbox')
export class MailboxController {
  constructor(private readonly mailboxService: MailboxService) {}

  @Post()
  sendMail(@Body() sendMailDto: SendMailDto) {
    return this.mailboxService.send(sendMailDto);
  }
}

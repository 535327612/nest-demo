import { HttpException, Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailboxService {
  constructor(private readonly mailerService: MailerService) {}

  async send(sendMailDto: SendMailDto) {
    const { to, subject, text } = sendMailDto;
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text,
        from: process.env.MAILER_USER,
      });
    } catch (e: any) {
      console.log('e---', e);
      throw new HttpException(e.response, e.responseCode);
    }
  }
}

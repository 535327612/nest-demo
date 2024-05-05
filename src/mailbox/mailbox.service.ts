import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail';

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
      throw new HttpException(e.response ?? e.message, e.responseCode);
    }
  }
}

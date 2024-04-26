import { Module } from '@nestjs/common';
import { MailboxService } from './mailbox.service';
import { MailboxController } from './mailbox.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.qq.com',
        port: 587,
        service: 'qq',
        secure: true,
        auth: { pass: process.env.MAILER_PASS, user: process.env.MAILER_USER },
      },
    }),
  ],
  controllers: [MailboxController],
  providers: [MailboxService],
})
export class MailboxModule {}

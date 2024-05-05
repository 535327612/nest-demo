import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailboxModule } from './mailbox/mailbox.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, MailboxModule, LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

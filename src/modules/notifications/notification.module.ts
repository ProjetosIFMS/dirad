import { Logger, Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { SendMailNotification } from '../../shared/services/send-mail.service';
import { MailModule } from '../../shared/configs/mailer.config';

@Module({
  imports: [MailModule],
  controllers: [NotificationController],
  providers: [SendMailNotification, Logger],
})
export class NotificationModule {}

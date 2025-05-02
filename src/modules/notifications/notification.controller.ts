import { ProcessNotification } from '../../shared/interfaces/process-notification';
import {
  Body,
  Controller,
  Logger,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import { SendMailNotification } from '../../shared/services/send-mail.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly mailer: SendMailNotification,
    private readonly logger: Logger = new Logger(),
  ) {}

  @Post('process')
  async sendProcessNotification(@Body() data: ProcessNotification) {
    try {
      await this.mailer.sendMail(data);
      return { message: 'Notification process sending successfully!' };
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error send email',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ProcessNotification } from '../interfaces/process-notification';

@Injectable()
export class SendMailNotification {
  private readonly logger = new Logger(SendMailNotification.name);

  constructor(private readonly mailService: MailerService) {}

  async sendMail(data: ProcessNotification) {
    try {
      this.logger.log(`Sending email to ${data.destinyResponsibleEmail}`);

      const date = new Date(data.deadline);
      const deadlineDate = date.toLocaleDateString('pt-BR');
      const deadlineTime = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });

      await this.mailService.sendMail({
        to: data.destinyResponsibleEmail,
        subject: `[Processo ${data.processNumber}] Notificação de etapa`,
        template: 'notification',
        context: {
          ...data,
          deadlineDate,
          deadlineTime,
        },
      });

      this.logger.log('Email sent successfully');
    } catch (error) {
      this.logger.error('Error sending email', error.stack);
      throw error;
    }
  }
}

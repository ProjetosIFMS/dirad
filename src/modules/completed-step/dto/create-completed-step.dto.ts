import { IsDateString, IsEnum, IsString, IsOptional } from 'class-validator';
import { Status } from '../types/Status';

export class CreateCompletedStepDto {
  @IsEnum(Status, {
    message:
      'O status deve ser um dos valores válidos: PENDING, IN_PROGRESS, COMPLETED, CANCELLED, INACTIVE, OVERDUE, PREDICTED',
  })
  status: Status;

  @IsString({ message: 'O ID do passo deve ser uma string' })
  stepId: string;

  @IsString({ message: 'O ID do checklist deve ser uma string' })
  checklistId: string;

  @IsOptional()
  @IsString({ message: 'O ID do usuário deve ser uma string' })
  userId?: string;

  @IsDateString(
    {},
    {
      message:
        'A data de conclusão deve estar no formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)',
    },
  )
  completedAt: Date;
}

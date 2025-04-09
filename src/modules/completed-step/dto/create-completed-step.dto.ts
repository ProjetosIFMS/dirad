import { IsDateString, IsEnum, IsString, IsUUID } from 'class-validator';
import { Status } from '../types/Status';

export class CreateCompletedStepDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsEnum(Status)
  status: Status;

  @IsString()
  // @IsUUID()
  stepId: string;

  @IsString()
  @IsUUID()
  checklistId: string;

  @IsUUID()
  @IsString()
  userId: string;

  @IsDateString()
  completedAt: Date;
}

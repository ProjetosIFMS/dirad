import { IsDateString, IsEnum, IsInt, IsString } from 'class-validator';
import { Status } from '../types/Status';

export class CreateStepDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  origin: string;

  @IsString()
  destiny: string;

  @IsDateString()
  estimatedCompletionDays: Date;

  @IsEnum(Status)
  status: Status;

  @IsInt()
  order: number;

  @IsString()
  activityId: string;

  @IsString()
  modalityId: string;
}

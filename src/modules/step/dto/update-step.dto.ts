import { IsEnum, IsInt, IsString } from 'class-validator';
import { Status } from '../types/Status';

export class UpdateStepDto {
  @IsString()
  description: string;

  @IsString()
  origin: string;

  @IsString()
  destiny: string;

  @IsInt()
  estimatedCompletionDays: number;

  @IsEnum(Status)
  status: Status;

  @IsInt()
  order: number;

  @IsString()
  activityId: string;

  @IsString()
  modalityId: string;
}

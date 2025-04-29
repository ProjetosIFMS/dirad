import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Status } from '../types/Status';

export class CreateStepDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  description: string;

  @IsString()
  originSectorId: string;

  @IsString()
  destinySectorId: string;

  @IsString()
  @IsOptional()
  template?: string;

  @IsInt()
  estimatedCompletionDays: number;

  @IsEnum(Status)
  status: Status;

  @IsInt()
  order: number;

  @IsOptional()
  @IsString()
  activityId?: string;

  @IsOptional()
  @IsString()
  modalityId?: string;
}

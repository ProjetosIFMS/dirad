import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Status } from '../types/Status';

export class UpdateStepDto {
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
  @IsOptional()
  order?: number;

  @IsOptional()
  @IsString()
  activityId?: string;

  @IsOptional()
  @IsString()
  modalityId?: string;
}

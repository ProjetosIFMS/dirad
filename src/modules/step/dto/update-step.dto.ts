import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Status } from '../types/Status';

export class UpdateStepDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  originSectorId: string;

  @IsOptional()
  @IsString()
  destinySectorId: string;

  @IsString()
  @IsOptional()
  template?: string;

  @IsOptional()
  @IsInt()
  estimatedCompletionDays: number;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsInt()
  order: number;

  @IsOptional()
  @IsString()
  activityId?: string;

  @IsOptional()
  @IsString()
  modalityId?: string;
}

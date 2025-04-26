import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Status } from '../types/Status';

export class CreateStepDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  originSector: string;

  @IsString()
  destinySector: string;

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

  @IsOptional()
  @IsString()
  sectorId?: string;
}

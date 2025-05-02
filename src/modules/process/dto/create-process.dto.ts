import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../types/Status';

export class CreateProcessDto {
  @IsString()
  processNumber: string;

  @IsString()
  processTypeId: string;

  @IsString()
  executingUnitId: string;

  @IsString()
  @IsOptional()
  modalityId: string;

  @IsArray()
  participatingUnits?: string[];

  @IsEnum(Status)
  situation: Status;

  @IsNumber()
  estimatedValue: number;

  @IsString()
  object: string;

  @IsString()
  objectDescription: string;

  @IsString()
  adictionalInformation: string;

  @IsNumber()
  priority: number;

  @IsString()
  @IsOptional()
  checklistId?: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  expectedEndDate: Date;
}

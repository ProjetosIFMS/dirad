import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
  IsDateString,
  ValidateNested,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ParticipatingUnit } from 'src/modules/participating-unit/types/participating-unit';
import { Status } from '../types/Status';

export class UpdateProcessDto {
  @IsString()
  processNumber?: string;

  @IsString()
  @IsUUID()
  processTypeId?: string;

  @IsString()
  @IsUUID()
  executingUnitId?: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  modalityId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipatingUnit)
  participatingUnits?: ParticipatingUnit['id'][];

  @IsEnum(Status)
  situation?: Status;

  @IsNumber()
  estimatedValue?: number;

  @IsString()
  object?: string;

  @IsString()
  objectDescription?: string;

  @IsString()
  adictionalInformation?: string;

  @IsNumber()
  priority?: number;

  @IsString()
  @IsUUID()
  checklistId?: string;

  @IsDateString()
  expectedEndDate?: Date;

  @IsDateString()
  updatedAt?: Date;
}

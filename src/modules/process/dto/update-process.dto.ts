import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
  IsDateString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { ParticipatingUnit } from 'src/modules/participating-unit/types/participating-unit';

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

  @IsString()
  situation?: string;

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

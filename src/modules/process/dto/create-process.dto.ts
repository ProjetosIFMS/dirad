import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsString()
  situation: string;

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

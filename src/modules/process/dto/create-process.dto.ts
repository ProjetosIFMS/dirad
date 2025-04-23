import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProcessDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  processNumber: string;

  @IsString()
  @IsUUID()
  processTypeId: string;

  @IsString()
  @IsUUID()
  executingUnitId: string;

  @IsString()
  @IsUUID()
  modalityId: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
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
  @IsUUID()
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

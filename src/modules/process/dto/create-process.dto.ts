import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ParticipatingUnit } from 'src/modules/participating-unit/types/participating-unit';
import { Type } from 'class-transformer';

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
  managingUnitId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipatingUnit)
  participatingUnits: ParticipatingUnit[];

  @IsNumber()
  costing: number;

  @IsString()
  situation: string;

  @IsNumber()
  estimatedValue: number;

  @IsNumber()
  totalValue: number;

  @IsNumber()
  supplierValue: number;

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
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

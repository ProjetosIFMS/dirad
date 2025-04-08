import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { ParticipatingUnit } from 'src/modules/participating-unit/types/participating-unit';

export class UpdateProcessDto {
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
  adictionalInformation: string;

  @IsNumber()
  priority: number;

  @IsString()
  @IsUUID()
  checklistId: string;

  @IsDateString()
  updatedAt: string;
}

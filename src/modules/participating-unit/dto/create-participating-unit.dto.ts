import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateParticipatingUnitDto {
  @IsUUID()
  @IsString()
  id: string;

  @IsUUID()
  @IsString()
  unitId: string;

  @IsUUID()
  @IsString()
  processId: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

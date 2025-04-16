import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsString()
  shortName: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

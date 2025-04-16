import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateModalityDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

import { IsDateString, IsString, IsUUID } from 'class-validator';

export class UpdateProcessTypeDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

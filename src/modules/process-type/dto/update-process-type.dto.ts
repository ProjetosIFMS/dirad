import { IsDateString, IsString, IsUUID } from 'class-validator';

export class UpdateProcessTypeDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

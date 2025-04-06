import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateProcessTypeDto {
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

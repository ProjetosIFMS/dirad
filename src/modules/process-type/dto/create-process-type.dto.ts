import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateProcessTypeDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

import { IsDateString, IsUUID } from 'class-validator';

export class CreateChecklistDto {
  @IsUUID()
  id: string;

  @IsUUID()
  processId: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

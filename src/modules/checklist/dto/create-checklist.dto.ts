import { IsUUID } from 'class-validator';

export class CreateChecklistDto {
  @IsUUID()
  processId: string;
}

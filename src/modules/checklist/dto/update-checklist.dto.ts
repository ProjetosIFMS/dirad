import { IsUUID } from 'class-validator';

export class UpdateChecklistDto {
  @IsUUID()
  processId: string;
}

import { IsString, IsUUID } from 'class-validator';

export class UpdateParticipatingUnitDto {
  @IsUUID()
  @IsString()
  unitId: string;

  @IsUUID()
  @IsString()
  processId: string;
}

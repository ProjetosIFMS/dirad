import { PartialType } from '@nestjs/mapped-types';
import { CreateModalityDto } from './create-modality.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdateModalityDto extends PartialType(CreateModalityDto) {
  @IsString()
  name: string;

  @IsUUID()
  processId: string;
}

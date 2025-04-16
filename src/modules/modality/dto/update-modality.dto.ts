import { PartialType } from '@nestjs/mapped-types';
import { CreateModalityDto } from './create-modality.dto';
import { IsString } from 'class-validator';

export class UpdateModalityDto extends PartialType(CreateModalityDto) {
  @IsString()
  name: string;
}

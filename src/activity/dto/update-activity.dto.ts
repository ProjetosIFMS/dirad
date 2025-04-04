import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';
import { IsDateString, IsString } from 'class-validator';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

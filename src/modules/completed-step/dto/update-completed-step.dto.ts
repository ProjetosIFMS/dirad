import { PartialType } from '@nestjs/mapped-types';
import { CreateCompletedStepDto } from './create-completed-step.dto';
import { IsEnum } from 'class-validator';
import { Status } from '../types/Status';

export class UpdateCompletedStepDto extends PartialType(
  CreateCompletedStepDto,
) {
  @IsEnum(Status)
  status: Status;
}

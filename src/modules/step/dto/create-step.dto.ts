import { IsBoolean, IsDateString, IsInt, IsString } from 'class-validator';

export class CreateStepDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  origin: string;

  @IsString()
  destiny: string;

  @IsDateString()
  deadline: Date;

  @IsBoolean()
  status: boolean;

  @IsInt()
  order: number;

  @IsString()
  activityId: string;

  @IsString()
  modalityId: string;
}

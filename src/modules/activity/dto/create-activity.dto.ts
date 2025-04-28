import { IsNumber, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  order: number;
}

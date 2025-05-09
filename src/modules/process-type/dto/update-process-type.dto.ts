import { IsString } from 'class-validator';

export class UpdateProcessTypeDto {
  @IsString()
  name: string;
}

import { IsString } from 'class-validator';

export class CreateProcessTypeDto {
  @IsString()
  name: string;
}

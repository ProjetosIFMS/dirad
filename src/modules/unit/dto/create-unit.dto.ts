import { IsString } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsString()
  shortName: string;
}

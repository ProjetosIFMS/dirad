import { IsString } from 'class-validator';

export class CreateSectorDto {
  @IsString()
  shortName: string;

  @IsString()
  description: string;

  @IsString()
  responsible_name: string;

  @IsString()
  responsible_email: string;
}

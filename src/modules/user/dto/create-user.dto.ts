import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class CreateUserDTO {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsDateString()
  createdAt?: string;

  @IsDateString()
  updatedAt?: string;
}

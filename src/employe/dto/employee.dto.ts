import { IsString, IsBoolean, MinLength, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEmployeeDto {

  @IsString()
  @MinLength(2)
  personalId: string;
  @IsString()
  @MinLength(2)
  firtName: string;
  @IsString()
  @MinLength(2)
  lastName: string;
  @IsString()
  @MinLength(2)
  age: number;
  @IsString()
  @MinLength(2)
  phoneNumber: string;
  @IsString()
  @MinLength(2)
  email: string;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

export class ChangeStatusDto {
  @IsBoolean()
  status: boolean;
}

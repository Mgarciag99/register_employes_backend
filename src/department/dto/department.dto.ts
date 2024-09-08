import { IsString, IsBoolean, MinLength, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDepartmentDto {
  @IsNumber()
  idCountry: number;

  @IsString()
  @MinLength(2)
  name: string;
}

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}

export class ChangeStatusDto {
  @IsBoolean()
  status: boolean;
}

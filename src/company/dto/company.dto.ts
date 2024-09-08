import {
  IsString,
  IsBoolean,
  MinLength,
  IsNumber,
  isNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCompanyDto {
  @IsNumber()
  idCountry: number;
  @IsNumber()
  idMunicipality?: number;
  @IsNumber()
  idDepartment?: number;
  @IsString()
  @MinLength(2)
  nit: string;
  @IsString()
  @MinLength(2)
  legalName: string;
  @IsString()
  @MinLength(2)
  comercialName: string;
  @IsString()
  @MinLength(2)
  phoneNumber: string;
  @IsString()
  @MinLength(2)
  email: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}

export class ChangeStatusDto {
  @IsBoolean()
  status: boolean;
}

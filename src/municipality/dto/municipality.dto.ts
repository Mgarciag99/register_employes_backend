import { IsString, IsBoolean, MinLength, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMunicipalityDto {

  @IsString()
  @MinLength(2)
  name: string;
}

export class UpdateMunicipalityDto extends PartialType(CreateMunicipalityDto) {}

export class ChangeStatusDto {
  @IsBoolean()
  status: boolean;
}

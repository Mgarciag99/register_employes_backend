import { IsString, IsBoolean, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCountryDto {
  @IsString()
  @MinLength(2)
    name: string;
}


export class UpdateCountryDto extends PartialType(CreateCountryDto) {}

export class ChangeStatusDto {
  @IsBoolean()
    status: boolean;
}
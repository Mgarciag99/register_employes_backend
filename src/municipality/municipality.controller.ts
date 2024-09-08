import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { ChangeStatusDto, CreateMunicipalityDto, UpdateMunicipalityDto } from './dto/municipality.dto';

@Controller('municipality')
export class MunicipalityController {
  constructor(private readonly municipalityService: MunicipalityService) {}
  @Post('create/:idDepartment')
  create(
    @Body() createmunicipalityDto: CreateMunicipalityDto,
    @Param('idDepartment') idDepartment: number,
  ) {
    return this.municipalityService.create(createmunicipalityDto, idDepartment);
  }

  @Post('update/:idMunicipality/:idDepartment')
  update(
    @Body() updatemunicipalityDto: UpdateMunicipalityDto,
    @Param('idMunicipality') idmunicipality: number,
    @Param('idDepartment') idDepartment: number,
    
  ) {
    return this.municipalityService.update(
      updatemunicipalityDto,
      idmunicipality,
      idDepartment,
    );
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number, @Body() changeStatusDto: ChangeStatusDto) {
    return this.municipalityService.changeStatus(changeStatusDto, id);
  }

  @Get()
  getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.municipalityService.getAll(page, limit);
  }
}

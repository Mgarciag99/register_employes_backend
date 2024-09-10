import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { ChangeStatusDto, CreateMunicipalityDto, UpdateMunicipalityDto } from './dto/municipality.dto';

@Controller('municipality')
export class MunicipalityController {
  constructor(private readonly municipalityService: MunicipalityService) {}
  @Post('create/:idDepartment/:idCountry')
  async create(
    @Body() createmunicipalityDto: CreateMunicipalityDto,
    @Param('idDepartment') idDepartment: number,
    @Param('idCountry') idCountry: number,

  ) {
    return this.municipalityService.create(createmunicipalityDto, idDepartment, idCountry);
  }

  @Post('update/:idMunicipality/:idDepartment/:idCountry')
  async update(
    @Body() updatemunicipalityDto: UpdateMunicipalityDto,
    @Param('idMunicipality') idmunicipality: number,
    @Param('idDepartment') idDepartment: number,
    @Param('idCountry') idCountry: number,
  ) {
    return this.municipalityService.update(
      updatemunicipalityDto,
      idmunicipality,
      idDepartment,
      idCountry
    );
  }

  @Put('delete/:id')
  delete(@Param('id') id: number, @Body() changeStatusDto: ChangeStatusDto) {
    return this.municipalityService.changeStatus(changeStatusDto, id);
  }

  @Get()
  async getAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10,
    @Query('search') search: string = ''
  ) {
    return this.municipalityService.getAll(search, page, limit);
  }

  @Get('municipalities-list')
  async getMunicipalities(
    @Query('idCountry') idCountry: number, 
    @Query('idDepartment') idDepartment: number, 
  ): Promise<{id: number, name: string}[]> {
    return this.municipalityService.getMunicipalities(idDepartment, idCountry);
  }

}

import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ChangeStatusDto, CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Post(':idCompany')
  update(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Param('idCompany') idCompany: number,
  ) {
    return this.companyService.update(updateCompanyDto, idCompany);
  }

  @Put('delete/:id')
  delete(@Param('id') id: number, @Body() changeStatusDto: ChangeStatusDto) {
    return this.companyService.changeStatus(changeStatusDto, id);
  }

  @Get()
  getAll(
    @Query('search') search: string = '', 
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    return this.companyService.getAll(search, page, limit);
  }

  @Get('assignation')
  getComaniesAssigned(
    @Query('idEmploye') employeeId: number, 
  ) {
    return this.companyService.getCompaniesWithCheck(employeeId);
  }

  @Post('assignOne/:idEmploye/:idCompany')
  assignCompanyToEmployee(
    @Param('idEmploye') employeeId: number,
    @Param('idCompany') companyId: number,
  ) {
    return this.companyService.assignCompanyToEmployee(employeeId, companyId);
  }


}

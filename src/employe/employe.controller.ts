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
import { EmployeService } from './employe.service';
import {
  ChangeStatusDto,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from './dto/employee.dto';
@Controller('employee')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}
  @Post('')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeService.create(createEmployeeDto);
  }

  @Post(':idEmployee')
  update(
    @Body() updatemunicipalityDto: UpdateEmployeeDto,
    @Param('idEmployee') idEmployee: number,
  ) {
    return this.employeService.update(updatemunicipalityDto, idEmployee);
  }

  @Put('delete/:id')
  delete(@Param('id') id: number, @Body() changeStatusDto: ChangeStatusDto) {
    return this.employeService.changeStatus(changeStatusDto, id);
  }

  @Get()
  getAll(
    @Query('search') search: string = '',
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10) {
    return this.employeService.getAll(search, page, limit);
  }
}

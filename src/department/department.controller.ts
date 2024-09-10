import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ChangeStatusDto, CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Post(':id')
  update(
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @Param('id') idDepartment: number,
  ) {
    return this.departmentService.update(updateDepartmentDto, idDepartment);
  }

  @Put('delete/:id')
  delete(
      @Param('id') id: number,
      @Body() changeStatusDto: ChangeStatusDto
  ){
      return this.departmentService.changeStatus(changeStatusDto, id);   
  }

  @Get()
  getAll(
      @Query('search') search: string = '',
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10
  ){
      return this.departmentService.getAll(search, page, limit);
  }
}

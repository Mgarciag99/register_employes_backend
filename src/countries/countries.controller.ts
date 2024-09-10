import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ChangeStatusDto, CreateCountryDto, UpdateCountryDto } from './dto/countries.dto';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
    constructor(private readonly countryService: CountriesService){}
    @Post()
    create(@Body() CreateCountryDto: CreateCountryDto){
        return this.countryService.create(CreateCountryDto);
    }

    @Post(':id')
    update(
        @Param('id') id: number,
        @Body() updateCountryDto: UpdateCountryDto
    ){
        return this.countryService.update(updateCountryDto, id);
    }

    @Put('delete/:id')
    delete(
        @Param('id') id: number,
        @Body() changeStatusDto: ChangeStatusDto
    ){
        return this.countryService.changeStatus(changeStatusDto, id);   
    }

    @Get()
    getAll(
        @Query('search') search: string = '',
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ){
        return this.countryService.getAll(search, page, limit);
    }

    @Get('countries-list')
    async getCountries(): Promise<{id: number, name: string}[]> {
      return this.countryService.getCountries();
    }

}

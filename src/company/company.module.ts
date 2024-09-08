import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CountriesModule } from 'src/countries/countries.module';
import { MunicipalityModule } from 'src/municipality/municipality.module';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [CountriesModule, MunicipalityModule, DepartmentModule],
})
export class CompanyModule {}

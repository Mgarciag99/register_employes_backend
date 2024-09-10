import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CountriesModule } from 'src/countries/countries.module';
import { MunicipalityModule } from 'src/municipality/municipality.module';
import { DepartmentModule } from 'src/department/department.module';
import { Company } from './company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employe } from 'src/employe/employe.entity';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [
    TypeOrmModule.forFeature([Company]), 
    TypeOrmModule.forFeature([Employe]), 
    CountriesModule, MunicipalityModule, DepartmentModule],
})
export class CompanyModule {}

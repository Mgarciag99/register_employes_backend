import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { CountriesModule } from 'src/countries/countries.module';

@Module({
  imports: [CountriesModule],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService]
})
export class DepartmentModule {}

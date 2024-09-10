import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { CountriesModule } from 'src/countries/countries.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department]),
    CountriesModule,
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService]
})
export class DepartmentModule {}

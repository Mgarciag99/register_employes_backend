import { Module } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { DepartmentModule } from 'src/department/department.module';
import { Municipality } from './municipality.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MunicipalityService],
  controllers: [MunicipalityController],
  imports: [
    TypeOrmModule.forFeature([Municipality]),
    DepartmentModule
  ],
  exports: [MunicipalityService]
})
export class MunicipalityModule {}

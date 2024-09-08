import { Module } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  providers: [MunicipalityService],
  controllers: [MunicipalityController],
  imports: [DepartmentModule],
  exports: [MunicipalityService]
})
export class MunicipalityModule {}

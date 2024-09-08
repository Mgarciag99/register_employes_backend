import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { DepartmentModule } from './department/department.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { CompanyModule } from './company/company.module';
import { EmployeModule } from './employe/employe.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'register_employers',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    CountriesModule,
    DepartmentModule,
    MunicipalityModule,
    CompanyModule,
    EmployeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

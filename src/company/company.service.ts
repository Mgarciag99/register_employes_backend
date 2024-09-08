import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CountriesService } from 'src/countries/countries.service';
import { DepartmentService } from 'src/department/department.service';
import { MunicipalityService } from 'src/municipality/municipality.service';
import { DataSource } from 'typeorm';
import { ChangeStatusDto, CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    private dataSource: DataSource,
    private departmentService: DepartmentService,
    private municipaltyService: MunicipalityService,
    private countryService: CountriesService,
  ) {}

  async findOne(idCompany: number) {
    return await this.dataSource.getRepository(Company).findOne({
      where: { idCompany },
    });
  }

  async createCompany(createCompanyDto: CreateCompanyDto) {
    try {
      const {
        idCountry,
        idMunicipality,
        idDepartment,
        nit,
        legalName,
        comercialName,
        phoneNumber,
        email,
      } = createCompanyDto;

      const department = await this.departmentService.findOne(idDepartment);
      const municipality =
        await this.municipaltyService.findOne(idMunicipality);
      const country = await this.countryService.findOne(idCountry);

      if (!country) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'department not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const { generatedMaps } = await this.dataSource.manager
        .createQueryBuilder()
        .from(Company, 'EM')
        .insert()
        .values({
          nit,
          legalName,
          comercialName,
          phoneNumber,
          email,
          department,
          municipality,
          country,
          status: true,
        })
        .execute();
      return {
        idCompany: generatedMaps[0].idCompany,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          error: 'Could not create department',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }


  async update(updateCompanyDto: UpdateCompanyDto, idCompany: number) {
    try {
      const {
        idCountry,
        idMunicipality,
        idDepartment,
        nit,
        legalName,
        comercialName,
        phoneNumber,
        email,
      } = updateCompanyDto;

      const department = await this.departmentService.findOne(idDepartment);
      const municipality =
        await this.municipaltyService.findOne(idMunicipality);
      const country = await this.countryService.findOne(idCountry);
      const company = await this.findOne(idCompany);

      if (!country || !company) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.dataSource.manager
        .createQueryBuilder()
        .update(Company)
        .set({
          nit,
          legalName,
          comercialName,
          phoneNumber,
          email,
          department,
          municipality,
          country
        })
        .execute();
      return {
        idCompany,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          error: 'Could not create company',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async changeStatus(changeStatusDto: ChangeStatusDto, idCompany: number) {
    try {
      const company = await this.findOne(idCompany);
      if (!company) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'company not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.dataSource.manager
        .createQueryBuilder()
        .update(Company)
        .set({
          ...changeStatusDto,
        })
        .where('idCompany = :idCompany', { idCompany })
        .execute();
      return {
        idCompany,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          error: 'Could not create country',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async getAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    try {
      const [countries, total] = await this.dataSource
        .getRepository(Company)
        .findAndCount({
          skip,
          take: limit,
          order: { createdAt: 'DESC' }, // Optional: adjust ordering as needed
        });

      return {
        data: countries,
        total,
        page,
        lastPage: Math.ceil(total / limit),
        limit,
      };
    } catch (error) {
      console.error('Error fetching paginated data', error);
      throw new Error('Could not fetch paginated municipalities');
    }
  }

}

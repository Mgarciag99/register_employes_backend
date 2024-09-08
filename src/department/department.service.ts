import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ChangeStatusDto, CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
import { Department } from './department.entity';
import { CountriesService } from 'src/countries/countries.service';

@Injectable()
export class DepartmentService {
  constructor(
    private dataSource: DataSource,
    private countriesService: CountriesService,
  ) {}

  async findOne(idDepartment: number) {
    return await this.dataSource.getRepository(Department).findOne({
      where: { idDepartment },
    });
  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      const { idCountry, name } = createDepartmentDto;

      const country = await this.countriesService.findOne(idCountry);
      if (!country) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Country not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // Check if the country exists
      const { generatedMaps } = await this.dataSource.manager
        .createQueryBuilder()
        .from(Department, 'D')
        .insert()
        .values({
          name,
          country: country,
          status: true,
        })
        .execute();
      return {
        idDepartment: generatedMaps[0].idDepartment,
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

  async update(updateDepartmentDto: UpdateDepartmentDto, idDepartment: number) {
    try {
      const { idCountry, name } = updateDepartmentDto;
      const country = await this.countriesService.findOne(idCountry);

      const department = await this.findOne(idDepartment);

      if (!country || !department) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Country not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.dataSource.manager
        .createQueryBuilder()
        .update(Department)
        .set({
          name,
          country: country,
        })
        .where('idDepartment = :idDepartment', { idDepartment: idDepartment })
        .execute();
      return {
        idDepartment,
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

  async changeStatus(changeStatusDto: ChangeStatusDto, idDepartment: number) {
    try {
      const department = await this.findOne(idDepartment);
      if (!department) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'department not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.dataSource.manager
        .createQueryBuilder()
        .update(department)
        .set({
          ...changeStatusDto,
        })
        .where('idDepartment = :idDepartment', { idDepartment: idDepartment })
        .execute();
      return {
        idDepartment,
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
        .getRepository(Department)
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
      throw new Error('Could not fetch paginated departments');
    }
  }

}

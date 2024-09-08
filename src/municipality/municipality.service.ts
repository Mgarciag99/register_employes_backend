import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DepartmentService } from 'src/department/department.service';
import { DataSource } from 'typeorm';
import { Municipality } from './municipality.entity';
import {
  ChangeStatusDto,
  CreateMunicipalityDto,
  UpdateMunicipalityDto,
} from './dto/municipality.dto';
@Injectable()
export class MunicipalityService {
  constructor(
    private dataSource: DataSource,
    private departmentService: DepartmentService,
  ) {}
  async findOne(idMunicipality: number) {
    return await this.dataSource.getRepository(Municipality).findOne({
      where: { idMunicipality },
    });
  }

  async create(
    CreateMunicipalityDto: CreateMunicipalityDto,
    idDepartment: number,
  ) {
    try {
      const department = await this.departmentService.findOne(idDepartment);
      if (!department) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'department not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // Check if the department exists
      const { generatedMaps } = await this.dataSource.manager
        .createQueryBuilder()
        .from(Municipality, 'M')
        .insert()
        .values({
          ...CreateMunicipalityDto,
          department,
          status: true,
        })
        .execute();
      return {
        idMunicipality: generatedMaps[0].idMunicipality,
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

  async update(
    updateDepartmentDto: UpdateMunicipalityDto,
    idMunicipality: number,
    idDepartment: number,
  ) {
    try {
      const department = await this.departmentService.findOne(idDepartment);

      const municipality = await this.findOne(idMunicipality);

      if (!department || !municipality) {
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
        .update(Municipality)
        .set({
          ...updateDepartmentDto,
          department,
        })
        .where('idMunicipality = :idMunicipality', { idMunicipality })
        .execute();
      return {
        idMunicipality,
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

  async changeStatus(changeStatusDto: ChangeStatusDto, idMunicipality: number) {
    try {
      const municipality = await this.findOne(idMunicipality);
      if (!municipality) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'municipality not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.dataSource.manager
        .createQueryBuilder()
        .update(Municipality)
        .set({
          ...changeStatusDto,
        })
        .where('idMunicipality = :idMunicipality', { idMunicipality })
        .execute();
      return {
        idMunicipality,
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
        .getRepository(Municipality)
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

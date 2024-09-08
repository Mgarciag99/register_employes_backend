import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Employe } from './employe.entity';
import {
  ChangeStatusDto,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from './dto/employee.dto';

@Injectable()
export class EmployeService {
  constructor(private dataSource: DataSource) {}
  async findOne(idEmploye: number) {
    return await this.dataSource.getRepository(Employe).findOne({
      where: { idEmploye },
    });
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const { generatedMaps } = await this.dataSource.manager
        .createQueryBuilder()
        .from(Employe, 'E')
        .insert()
        .values({
          ...createEmployeeDto,
          status: true,
        })
        .execute();
      return {
        idEmploye: generatedMaps[0].idEmploye,
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

  async update(updateEmployeeDto: UpdateEmployeeDto, idEmploye: number) {
    try {
      const employee = await this.findOne(idEmploye);

      if (!employee) {
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
        .update(Employe)
        .set({
          ...updateEmployeeDto,
        })
        .where('idEmploye = :idEmploye', { idEmploye })
        .execute();
      return {
        idEmploye,
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

  async changeStatus(changeStatusDto: ChangeStatusDto, idEmploye: number) {
    try {
      const employe = await this.findOne(idEmploye);
      if (!employe) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'employe not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.dataSource.manager
        .createQueryBuilder()
        .update(Employe)
        .set({
          ...changeStatusDto,
        })
        .where('idEmploye = :idEmploye', { idEmploye })
        .execute();
      return {
        idEmploye,
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
        .getRepository(Employe)
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

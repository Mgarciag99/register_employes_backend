import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DepartmentService } from 'src/department/department.service';
import { DataSource, ILike, Repository } from 'typeorm';
import { Municipality } from './municipality.entity';
import {
  ChangeStatusDto,
  CreateMunicipalityDto,
  UpdateMunicipalityDto,
} from './dto/municipality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CountriesService } from 'src/countries/countries.service';
@Injectable()
export class MunicipalityService {
  constructor(
    @InjectRepository(Municipality)
    private readonly municipalityRepository: Repository<Municipality>,
    private dataSource: DataSource,
    private departmentService: DepartmentService,
    private countriesService: CountriesService
  ) {}
  async findOne(idMunicipality: number) {
    return await this.dataSource.getRepository(Municipality).findOne({
      where: { idMunicipality },
    });
  }

  async create(
    CreateMunicipalityDto: CreateMunicipalityDto,
    idDepartment: number,
    idCountry: number
  ) {
    try {
      const department = await this.departmentService.findOne(idDepartment);
      const country = await this.countriesService.findOne(idCountry);

      if (!department && !country) {
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
          country,
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
    idCountry: number
  ) {
    try {
      const department = await this.departmentService.findOne(idDepartment);
      const country = await this.countriesService.findOne(idCountry);
      const municipality = await this.findOne(idMunicipality);

      if (!department || !municipality || !country) {
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
          country
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

  async getAll(search: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    try {
      const filter: any = {};
        
      if (search) {
        filter.name = ILike(`%${search}%`);
      }

      const [municipalities, total] = await this.dataSource
      .getRepository(Municipality)
      .createQueryBuilder('municipality')
      .leftJoinAndSelect('municipality.department', 'department')
      .leftJoinAndSelect('municipality.country', 'country') 
      .select([
        'municipality.idMunicipality',
        'municipality.name',
        'municipality.status',
        'municipality.updatedAt',
        'municipality.createdAt',
        'department.idDepartment',
        'country.idCountry' 
      ])
      .where(filter)
      .skip(skip)
      .take(limit)
      .orderBy('municipality.createdAt', 'DESC')
      .getManyAndCount();

    const formattedMunicipalities = municipalities.map(municipality => ({
      idMunicipality: municipality.idMunicipality,
      name: municipality.name,
      status: municipality.status,
      updatedAt: municipality.updatedAt,
      createdAt: municipality.createdAt,
      idDepartment: municipality.department.idDepartment,
      idCountry: municipality.country.idCountry
    }));

      return {
        data: formattedMunicipalities,
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

  async getMunicipalities(idDepartment?: number, idCountry?: number): Promise<any[]> {
    const queryBuilder =  this.municipalityRepository
      .createQueryBuilder('municipality')
      .select([
        'municipality.idMunicipality AS id', 
        'municipality.name AS name',    
      ])

      if (idDepartment) {
        queryBuilder.where('municipality.department.idDepartment = :idDepartment', { idDepartment });
      }

      if(idCountry){
        queryBuilder.where('municipality.country.idCountry = :idCountry', { idCountry });

      }

      return queryBuilder.getRawMany();  
  }

}

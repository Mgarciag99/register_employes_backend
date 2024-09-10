import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { DataSource, ILike, Repository } from 'typeorm';
import {
  ChangeStatusDto,
  CreateCountryDto,
  UpdateCountryDto,
} from './dto/countries.dto';
import { Country } from './countries.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private dataSource: DataSource
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    try {
      const { generatedMaps } = await this.dataSource.manager
        .createQueryBuilder()
        .from(Country, 'C')
        .insert()
        .values({
          ...createCountryDto,
          status: true,
        })
        .execute();
      return {
        idCountry: generatedMaps[0].idCountry,
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

  async findOne(idCountry: number) {
    return await this.dataSource.getRepository(Country).findOne({
      where: { idCountry },
    });
  }

  async update(updateCountryDto: UpdateCountryDto, idCountry: number) {
    try {
      const country = await this.findOne(idCountry);
      if (!country) {
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
        .update(Country)
        .set({
          ...updateCountryDto,
        })
        .where('idCountry = :idCountry', { idCountry: idCountry })
        .execute();
      return {
        idCountry,
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

  async changeStatus(changeStatusDto: ChangeStatusDto, idCountry: number) {
    try {
      const country = await this.findOne(idCountry);
      if (!country) {
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
        .update(Country)
        .set({
          ...changeStatusDto,
        })
        .where('idCountry = :idCountry', { idCountry: idCountry })
        .execute();
      return {
        idCountry,
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

      const [countries, total] = await this.dataSource
        .getRepository(Country)
        .findAndCount({
          where: filter,
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
      throw new Error('Could not fetch paginated countries');
    }
  }

  async getCountries(): Promise<any[]> {
    return this.countryRepository
      .createQueryBuilder('country')
      .select([
        'country.idCountry AS id', // Aliasing idCountry to id
        'country.name AS name',    // Aliasing name to name
      ])
      .getRawMany(); // Use getRawMany to get raw data
  }

}

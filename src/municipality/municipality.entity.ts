import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
import { Department } from 'src/department/department.entity';
import { Country } from 'src/countries/countries.entity';
  @Entity({ name: 'municipalities' })
  export class Municipality {
    @PrimaryGeneratedColumn()
    idMunicipality: number;
    @ManyToOne(() => Country, (country) => country.idCountry)
    country: Country;
    @ManyToOne(() => Department, (department) => department.idDepartment)
    department: Department;
    @Column()
    name: string;
    @Column()
    status: boolean;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  }
  
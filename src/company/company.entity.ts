import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Department } from 'src/department/department.entity';
import { Country } from 'src/countries/countries.entity';
import { Municipality } from 'src/municipality/municipality.entity';
import { Employe } from 'src/employe/employe.entity';
@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn()
  idCompany: number;
  @ManyToOne(() => Country, (country) => country.idCountry)
  country: Country;
  @ManyToOne(() => Department, (department) => department.idDepartment)
  department: Department;
  @ManyToOne(() => Municipality, (municipality) => municipality.idMunicipality)
  municipality: Municipality;
  @Column()
  nit: string;
  @Column()
  legalName: string;
  @Column()
  comercialName: string;
  @Column()
  phoneNumber: string;
  @Column()
  email: string;
  @Column()
  status: boolean;
  @ManyToMany(() => Employe, employe => employe.companies)
  @JoinTable()
  employees: Employe[];
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

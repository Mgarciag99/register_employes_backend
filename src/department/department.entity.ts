import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Country } from 'src/countries/countries.entity';
@Entity({ name: 'departments' })
export class Department {
  @PrimaryGeneratedColumn()
  idDepartment: number;
  @ManyToOne(() => Country, (country) => country.idCountry)
  country: Country;
  @Column()
  name: string;
  @Column()
  status: boolean;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

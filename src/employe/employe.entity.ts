import { Company } from 'src/company/company.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
  @Entity({ name: 'employes' })
  export class Employe {
    @PrimaryGeneratedColumn()
    idEmploye: number;
    @Column()
    personalId: string;
    @Column()
    firtName: string;
    @Column()
    lastName: string;
    @Column()
    age: number;
    @Column()
    phoneNumber: string;
    @Column()
    email: string;
    @Column()
    status: boolean;
    @ManyToMany(() => Company, company => company.employees)
    companies: Company[];
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  }
  
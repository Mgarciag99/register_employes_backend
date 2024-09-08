import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'countries'})
export class Country{
    @PrimaryGeneratedColumn()
    idCountry: number;
    @Column()
    name: string;
    @Column()
    status: boolean;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
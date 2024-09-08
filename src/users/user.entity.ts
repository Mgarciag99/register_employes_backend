import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users'})
export class User{
    @PrimaryGeneratedColumn()
    idUser: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    status: boolean;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
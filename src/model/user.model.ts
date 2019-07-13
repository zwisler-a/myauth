import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Property } from './property.model';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    admin: boolean;

    @Column()
    password: string;

    @OneToMany(() => Property, property => property.user)
    properties: Property[];

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }
}

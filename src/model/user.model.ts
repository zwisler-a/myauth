import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }
}

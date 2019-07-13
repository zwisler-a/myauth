import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PropertyDefinition } from './property-definition.model';

@Entity()
export class Realm {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    domains: string;

    @Column()
    secret: string;

    @OneToMany(() => PropertyDefinition, property => property.realm, { eager: true })
    properties: PropertyDefinition[];

    constructor(name: string, domains: string, secret: string) {
        this.name = name;
        this.domains = domains;
        this.secret = secret;
    }
}

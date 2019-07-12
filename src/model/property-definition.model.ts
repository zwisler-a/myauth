import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Property } from './property.model';
import { Realm } from './realm.model';

@Entity()
export class PropertyDefinition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Realm, realm => realm.properties)
    realm: Realm;

    @OneToMany(() => Property, prop => prop.definition)
    propteries: Property[];
}

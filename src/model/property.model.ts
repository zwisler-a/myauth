import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';

import { PropertyDefinition } from './property-definition.model';
import { User } from './user.model';

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PropertyDefinition, propDef => propDef.propteries)
    definition: PropertyDefinition;

    @ManyToOne(() => User, user => user.properties)
    user: User;

    @Column()
    value: string;
}

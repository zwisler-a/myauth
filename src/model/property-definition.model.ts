import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Realm } from './realm.model';

@Entity()
export class PropertyDefinition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Realm, realm => realm.properties, { onDelete: 'CASCADE' })
    realm: Realm;
}

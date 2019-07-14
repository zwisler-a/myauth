import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Property {
    @PrimaryColumn()
    definitionId: number;

    @PrimaryColumn()
    userId: string;

    @Column()
    value: string;
}

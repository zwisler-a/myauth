import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Property {
    @PrimaryColumn({ type: 'int' })
    definitionId: number;

    @PrimaryColumn({ type: 'varchar', length: 40 })
    userId: string;

    @Column()
    value: string;
}

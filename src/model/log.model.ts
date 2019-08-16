import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LogEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    entry: string;

    @Column()
    timestamp: Date;

    constructor(message: string) {
        this.entry = message;
        this.timestamp = new Date();
    }
}

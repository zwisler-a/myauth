import { Service } from '@zwisler/bridge';
import { Connection } from 'typeorm';

@Service()
export class OrmService {
    _connection: Connection;
    constructor() {}

    setConnection(con: Connection) {
        this._connection = con;
    }

    get connection() {
        return this._connection;
    }
}

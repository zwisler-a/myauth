import { Resolve, Service } from '@zwisler/bridge';
import { createConnection } from 'typeorm';

import { PropertyDefinition } from './model/property-definition.model';
import { Property } from './model/property.model';
import { Realm } from './model/realm.model';
import { User } from './model/user.model';
import { OrmService } from './service/orm.service';

const config = require('./config.json');

@Service()
export class InitServer implements Resolve {
    constructor(private ormService: OrmService) {}
    async resolve(): Promise<any> {
        const ormConfig = Object.assign(config.orm, { entities: [User, Realm, PropertyDefinition, Property] });
        const con = await createConnection(ormConfig);
        this.ormService.setConnection(con);
        return null;
    }
}

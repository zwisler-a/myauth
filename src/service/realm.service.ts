import { Service } from '@zwisler/bridge';
import { Repository } from 'typeorm';

import { Realm } from '../model/realm.model';
import { OrmService } from './orm.service';

@Service()
export class RealmService {
    private realmRepo: Repository<Realm>;
    constructor(ormService: OrmService) {
        this.realmRepo = ormService.connection.getRepository(Realm);
    }

    getAll() {
        return this.realmRepo.find();
    }

    async update(realmId: string, name: string, domains: string, secret: string) {
        const realm = await this.realmRepo.findOne(realmId);
        realm.name = name;
        realm.domains = domains;
        realm.secret = secret;
        return this.realmRepo.save(realm);
    }

    save(name: string, domains: string) {
        const realm = new Realm(name, domains);
        return this.realmRepo.save(realm);
    }

    get(realmId: string) {
        return this.realmRepo.findOne(realmId);
    }
}

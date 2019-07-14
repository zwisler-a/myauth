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

    getSmallList(): any {
        return this.realmRepo
            .createQueryBuilder()
            .select(['id', 'name'])
            .getRawMany();
    }

    async update(realmId: string, name: string, domains: string, secret: string, customStyle: string) {
        const realm = await this.realmRepo.findOne(realmId);
        realm.name = name;
        realm.domains = domains;
        realm.secret = secret;
        realm.customStyles = customStyle;
        return this.realmRepo.save(realm);
    }

    save(name: string, domains: string, secret: string, customStyle:string) {
        const realm = new Realm(name, domains, secret, customStyle);
        return this.realmRepo.save(realm);
    }

    delete(realmId: string) {
        return this.realmRepo
            .createQueryBuilder()
            .delete()
            .where('id = :realmId', { realmId })
            .execute();
    }

    get(realmId: string) {
        return this.realmRepo.findOne(realmId);
    }
}

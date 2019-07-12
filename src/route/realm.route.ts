import { Route, Endpoint } from '@zwisler/bridge';
import { RealmService } from '../service/realm.service';
import { create } from 'domain';

@Route({ basePath: '/realm' })
export class RealmRoute {
    constructor(private realmService: RealmService) {}

    @Endpoint()
    get() {
        return this.realmService.getAll();
    }

    @Endpoint({ method: 'POST' })
    create(name: string, domains: string) {
        return this.realmService.save(name, domains);
    }

    
}

import { Endpoint, Route } from '@zwisler/bridge';

import { RealmService } from '../service/realm.service';

@Route({ basePath: '/realm' })
export class RealmRoute {
    constructor(private realmService: RealmService) {}

    @Endpoint()
    get() {
        return this.realmService.getAll();
    }

    @Endpoint({ method: 'POST' })
    create(name: string, domains: string, secret: string) {
        return this.realmService.save(name, domains);
    }

    @Endpoint({ method: 'POST' })
    update(realmId: string, name: string, domains: string, secret: string) {
        return this.realmService.update(realmId, name, domains, secret);
    }
}

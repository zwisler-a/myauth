import { Endpoint, Route } from '@zwisler/bridge';

import { RealmService } from '../service/realm.service';
import { JwtService } from '../service/jwt.service';

@Route({ basePath: '/realm', middleware: [JwtService.authenticate()] })
export class RealmRoute {
    constructor(private realmService: RealmService) {}

    @Endpoint()
    all() {
        return this.realmService.getAll();
    }

    @Endpoint()
    async allshort() {
        return this.realmService.getSmallList();
    }

    @Endpoint()
    get(realmId: string) {
        return this.realmService.get(realmId);
    }

    @Endpoint({ method: 'POST' })
    create(name: string, domains: string, secret: string, customStyles: string) {
        return this.realmService.save(name, domains, secret, customStyles);
    }

    @Endpoint({ method: 'POST' })
    update(id: string, name: string, domains: string, secret: string, customStyles:string) {
        return this.realmService.update(id, name, domains, secret, customStyles);
    }

    @Endpoint({ method: 'DELETE' })
    delete(realmId: string) {
        return this.realmService.delete(realmId);
    }
}

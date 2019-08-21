import { Endpoint, Route } from '@zwisler/bridge';

import { PropertyService } from '../service/property.service';
import { RealmService } from '../service/realm.service';

@Route({ basePath: '/props' })
export class PropertyRoute {
    constructor(private propService: PropertyService, private realmService: RealmService) {}

    @Endpoint({ method: 'POST' })
    createDefinition(name: string, realmId: string) {
        return this.propService.createDefinition(name, realmId);
    }

    @Endpoint()
    getDefinitions(realmId: string) {
        return this.propService.getDefinitions(realmId);
    }

    @Endpoint({ method: 'DELETE' })
    deleteDefinition(definitionId: string) {
        this.propService.deleteDefinition(definitionId);
    }

    @Endpoint({ method: 'POST' })
    updateDefinition(definitionId: string, name: string) {
        this.propService.updateDefinition(definitionId, name);
    }

    @Endpoint()
    get(userId: string, definitionId: number) {
        return this.propService.get(userId, definitionId);
    }

    @Endpoint()
    async getForRealm(userId: string, realmId: string) {
        const realm = await this.realmService.get(realmId);
        return this.propService.bulkGet(userId, realm.properties.map(prop => prop.id));
    }

    @Endpoint({ method: 'POST' })
    update(userId: string, definitionId: number, value: string) {
        throw new Error('Not yet implemented');
    }
}

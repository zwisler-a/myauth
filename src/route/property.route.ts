import { Endpoint, Route } from '@zwisler/bridge';

import { PropertyService } from '../service/property.service';

@Route({ basePath: '/props' })
export class PropertyRoute {
    constructor(private propService: PropertyService) {}

    @Endpoint({ method: 'POST' })
    createDefinition(name: string, realmId: string) {
        return this.propService.createDefinition(name, realmId);
    }

    @Endpoint()
    getDefinitions(realmId: string) {
        return this.propService.getDefinitions(realmId);
    }

    @Endpoint({ method: 'DELETE' })
    deleteDefinitions(definitionId: string) {
        this.propService.deleteDefinition(definitionId);
    }

    @Endpoint({ method: 'POST' })
    updateDefinition(definitionId: string, name: string) {
        this.propService.updateDefinition(definitionId, name);
    }

    @Endpoint()
    get(userId: string, definitionId: string) {
        throw new Error('Not yet implemented');
    }

    @Endpoint({ method: 'POST' })
    update(userId: string, definitionId: number, value: string) {
        throw new Error('Not yet implemented');
    }
}

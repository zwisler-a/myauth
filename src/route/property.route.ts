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
    getDefinition(realmId: string) {
        return this.propService.getDefinitions(realmId);
    }

    @Endpoint()
    get(userId: string, propertyDefinitionId: string) {
        throw new Error('Not yet implemented');
    }

    @Endpoint({ method: 'POST' })
    update(propertyId: number, value: string) {
        throw new Error('Not yet implemented');
    }

    @Endpoint({ method: 'DELETE' })
    delete(propertyId: number) {
        throw new Error('Not yet implemented');
    }

    @Endpoint({ method: 'POST' })
    create(userId: string, propertyDefinitionId: string, value: string) {
        return this.propService.createProperty(userId, propertyDefinitionId, value);
    }
}

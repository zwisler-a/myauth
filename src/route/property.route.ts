import { Route, Endpoint } from '@zwisler/bridge';
import { PropertyService } from '../service/property.service';
import { create } from 'domain';

@Route({ basePath: '/props' })
export class PropertyRoute {
    constructor(private propService: PropertyService) {}

    @Endpoint({ method: 'POST' })
    createDefinition(name: string, realmId: string) {
        return this.propService.createDefinition(name, realmId);
    }

    @Endpoint()
    get(realmId: string) {
        return this.propService.getDefinitions(realmId);
    }

    @Endpoint({ method: 'POST' })
    create(userId: string, propertyDefinitionId: string, value: string) {
        return this.propService.createProperty(userId, propertyDefinitionId, value);
    }
}

import { Service } from '@zwisler/bridge';
import { OrmService } from './orm.service';
import { Property } from '../model/property.model';
import { Repository } from 'typeorm';
import { PropertyDefinition } from '../model/property-definition.model';

@Service()
export class PropertyService {
    private propRepo: Repository<Property>;
    private propDefRepo: Repository<PropertyDefinition>;
    constructor(ormService: OrmService) {
        this.propRepo = ormService.connection.getRepository(Property);
        this.propDefRepo = ormService.connection.getRepository(PropertyDefinition);
    }

    get(userId: string, propertyDefId: number) {
        return this.propRepo.find({ where: { user: userId, definition: propertyDefId } });
    }

    createProperty(userId: string, propertyDefId: string, value: string) {
        const newProp = new Property();
        newProp.definition = propertyDefId as any;
        newProp.value = value;
        newProp.user = userId as any;
        return this.propRepo.save(newProp);
    }

    createDefinition(name: string, realmId: string) {
        const propDef = new PropertyDefinition();
        propDef.name = name;
        propDef.realm = realmId as any;
        return this.propDefRepo.save(propDef);
    }

    getDefinitions(realmId: string) {
        return this.propDefRepo.find({ where: { realm: realmId } });
    }
}

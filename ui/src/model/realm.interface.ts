import { PropertyDefinition } from './property-definition.class';

export class Realm {
    public name: string = '';
    public id: string = '';
    public domains: string = '';
    public secret: string = '';
    public customStyles: string = '';
    public properties: PropertyDefinition[] = [];
}

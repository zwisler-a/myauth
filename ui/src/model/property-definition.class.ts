export class PropertyDefinition {
    constructor(public name: string, public state: PropertyUIState = PropertyUIState.UNCHANGED, public id = -1) {}
}
export enum PropertyUIState {
    TO_DELETE = 'delete',
    TO_UPDATE = 'update',
    TO_CREATE = 'create',
    UNCHANGED = 'chill'
}

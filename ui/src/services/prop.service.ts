import { AuthService } from './auth.service';
import { PropertyDefinition, PropertyUIState } from '@/model/property-definition.class';

export class PropService {
    public static getInstance() {
        if (this.instance) return this.instance;
        return (this.instance = new PropService());
    }
    private static instance: any;

    private readonly api = {
        get: '/api/props/getDefinitions?realmId=',
        delete: '/api/props/deleteDefinition?definitionId=',
        update: '/api/props/updateDefinition',
        create: '/api/props/createDefinition'
    };

    public updateDefinitions(realmId: string, realmProps: PropertyDefinition[]): any {
        return Promise.all(
            realmProps.map(realmProp => {
                switch (realmProp.state) {
                    case PropertyUIState.TO_UPDATE:
                        return this.updateDefinition(realmProp.id, realmProp.name);
                    case PropertyUIState.TO_CREATE:
                        return this.createDefinition(realmId, realmProp.name);
                    case PropertyUIState.TO_DELETE:
                        return this.deleteDefinition(realmProp.id);
                }
            })
        );
    }

    public getDefinition(realmId: string): Promise<PropertyDefinition[]> {
        return fetch(this.api.get + realmId, { headers: this.createHeaders() })
            .then(res => res.json())
            .then(this.unpackResponse());
    }

    public deleteDefinition(definitionId: number) {
        return fetch(this.api.delete + definitionId, { method: 'delete', headers: this.createHeaders() })
            .then(res => res.json())
            .then(this.unpackResponse());
    }

    public createDefinition(realmId: string, name: string) {
        return fetch(this.api.create, {
            method: 'post',
            body: JSON.stringify({ realmId, name }),
            headers: this.createHeaders()
        })
            .then(res => res.json())
            .then(this.unpackResponse());
    }

    public updateDefinition(definitionId: number, name: string) {
        return fetch(this.api.update, {
            method: 'post',
            body: JSON.stringify({ definitionId, name }),
            headers: this.createHeaders()
        })
            .then(res => res.json())
            .then(this.unpackResponse());
    }

    private createHeaders(additionalHeader?: { [key: string]: string }) {
        return Object.assign(
            {},
            { 'Content-Type': 'application/json', 'x-auth': AuthService.getAuthToken() },
            additionalHeader || {}
        );
    }

    private unpackResponse() {
        return (res: any) => {
            if (res.error) throw new Error(res.errorMessage);
            return res.data;
        };
    }
}

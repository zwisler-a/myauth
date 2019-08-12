import { AuthService } from './auth.service';

export class RealmService {
    public static getInstance() {
        if (this.instance) return this.instance;
        return (this.instance = new RealmService());
    }
    private static instance: any;

    private readonly api = {
        all: '/api/realm/allshort',
        update: '/api/realm/update',
        get: '/api/realm/get?realmId=',
        create: '/api/realm/create',
        delete: '/api/realm/delete?realmId='
    };

    public getRealms() {
        return fetch(this.api.all, { headers: this.createHeaders() })
            .then(res => res.json())
            .then(res => res.data);
    }

    public getRealm(id: string) {
        return fetch(this.api.get + id, { headers: this.createHeaders() })
            .then(res => res.json())
            .then(res => res.data);
    }

    public deleteRealm(realmId: string) {
        return fetch(this.api.delete + realmId, { method: 'delete', headers: this.createHeaders() })
            .then(res => res.json())
            .then(res => res.data);
    }

    public createRealm(realm: any) {
        return fetch(this.api.create, {
            method: 'post',
            body: JSON.stringify(realm),
            headers: this.createHeaders()
        })
            .then(res => res.json())
            .then(res => res.data);
    }

    public updateRealm(realm: any) {
        return fetch(this.api.update, {
            method: 'post',
            body: JSON.stringify(realm),
            headers: this.createHeaders()
        })
            .then(res => res.json())
            .then(res => res.data);
    }

    private createHeaders(additionalHeader?: { [key: string]: string }) {
        return Object.assign(
            {},
            { 'Content-Type': 'application/json', 'x-auth': AuthService.getAuthToken() },
            additionalHeader || {}
        );
    }
}

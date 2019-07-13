import { AuthService } from './auth.service.js';

export class RealmService {
    static getInstance() {
        if (this._instance) return this._instance;
        return (this._instance = new RealmService());
    }

    constructor() {
        this._api = {
            all: 'realm/all',
            update: 'realm/update',
            get: 'realm/get?realmId=',
            create: 'realm/create',
            delete: 'realm/delete?realmId='
        };
    }

    getRealms() {
        return fetch(this._api.all, { headers: { 'x-auth': AuthService.getInstance()._token } })
            .then(res => res.json())
            .then(res => {
                this._realms = res.data;
                return this._realms;
            });
    }

    getRealm(id) {
        return fetch(this._api.get + id, { headers: { 'x-auth': AuthService.getInstance()._token } })
            .then(res => res.json())
            .then(res => res.data);
    }

    deleteRealm(realmId) {
        return fetch(this._api.delete + realmId, { method: 'delete', headers: { 'x-auth': AuthService.getInstance()._token } })
            .then(res => res.json())
            .then(res => res.data);
    }

    createRealm(realm) {
        return fetch(this._api.create, {
            method: 'post',
            body: JSON.stringify(realm),
            headers: { 'Content-Type': 'application/json', 'x-auth': AuthService.getInstance()._token }
        })
            .then(res => res.json())
            .then(res => res.data);
    }

    updateRealm(realm) {
        return fetch(this._api.update, {
            method: 'post',
            body: JSON.stringify(realm),
            headers: { 'Content-Type': 'application/json', 'x-auth': AuthService.getInstance()._token }
        })
            .then(res => res.json())
            .then(res => res.data);
    }
}

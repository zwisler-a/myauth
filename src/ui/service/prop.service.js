import { AuthService } from './auth.service.js';

export class PropService {
    static getInstance() {
        if (this._instance) return this._instance;
        return (this._instance = new PropService());
    }

    constructor() {
        this._api = {
            createDefinition: 'props/createDefinition',
            updateDefinition: 'props/updateDefinition',
            getDefinitions: 'props/getDefinitions?realmId=:realmId',
            deleteDefinition: 'props/deleteDefinition?definitionId=:definitionId',
            get: 'props/get?userId=:userId%realmId=:realmId',
            update: 'props/update?definitionId=:definitionId'
        };
        this._auth = AuthService.getInstance();
    }
    _replaceUrlParams(url, params) {
        Object.keys(params).forEach(key => {
            url = url.replace(':' + key, params[key]);
        });
        return url;
    }

    createDefinition(realmId, name) {
        return fetch(this._api.createDefinition, {
            method: 'post',
            headers: { 'x-auth': this._auth._token, 'Content-Type': 'application/json' },
            body: JSON.stringify({ realmId, name })
        })
            .then(res => res.json())
            .then(res => res.data);
    }

    getDefinitions(realmId) {
        return fetch(this._replaceUrlParams(this._api.getDefinitions, { realmId }), {
            headers: { 'x-auth': this._auth._token }
        })
            .then(res => res.json())
            .then(res => res.data);
    }

    deleteDefinition(definitionId) {
        return fetch(this._replaceUrlParams(this._api.deleteDefinition, { definitionId }), {
            headers: { 'x-auth': this._auth._token }
        })
            .then(res => res.json())
            .then(res => res.data);
    }

    updateDefinition(definitionId, name) {
        return fetch(this._api.updateDefinition, {
            method: 'post',
            headers: { 'x-auth': this._auth._token, 'Content-Type': 'application/json' },
            body: JSON.stringify({ definitionId, name })
        })
            .then(res => res.json())
            .then(res => res.data);
    }
}

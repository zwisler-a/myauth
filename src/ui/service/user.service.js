import { AuthService } from './auth.service.js';

export class UserService {
    static getInstance() {
        if (this._instance) return this._instance;
        return (this._instance = new UserService());
    }

    constructor() {
        this._api = {
            all: 'user/getAll',
            get: 'user/get?id=',
            update: 'user/update',
            delete: 'user/delete?userId=',
            create: 'user/create'
        };
    }

    updateUser(userId, name, password, admin) {
        return fetch(this._api.update, {
            method: 'post',
            body: JSON.stringify({ userId, user: { name, password, admin } }),
            headers: { 'Content-type': 'application/json', 'x-auth': AuthService.getInstance()._token }
        })
            .then(res => res.json())
            .then(res => {
                this._realms = res.data;
                return this._realms;
            });
    }

    createUser(name, password, admin) {
        return fetch(this._api.create, {
            method: 'post',
            body: JSON.stringify({ name, password, admin }),
            headers: { 'Content-type': 'application/json', 'x-auth': AuthService.getInstance()._token }
        })
            .then(res => res.json())
            .then(res => {
                this._realms = res.data;
                return this._realms;
            });
    }

    deleteUser(userId) {
        return fetch(this._api.delete + userId, { method: 'delete', headers: { 'x-auth': AuthService.getInstance()._token } })
            .then(res => res.json())
            .then(res => {
                this._realms = res.data;
                return this._realms;
            });
    }

    getUsers() {
        return fetch(this._api.all, { headers: { 'x-auth': AuthService.getInstance()._token } })
            .then(res => res.json())
            .then(res => {
                this._realms = res.data;
                return this._realms;
            });
    }

    getUser(id) {
        return fetch(this._api.get + id, { headers: { 'x-auth': AuthService.getInstance()._token } })
            .then(res => res.json())
            .then(res => res.data);
    }
}

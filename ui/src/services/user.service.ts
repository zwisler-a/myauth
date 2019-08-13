import { AuthService } from './auth.service';

export class UserService {
    public static getInstance() {
        if (this.instance) return this.instance;
        return (this.instance = new UserService());
    }
    private static instance: any;

    private readonly api = {
        all: '/api/user/getAll',
        get: '/api/user/get?id=',
        update: '/api/user/update',
        delete: '/api/user/delete?userId=',
        create: '/api/user/create'
    };

    public updateUser(userId: any, name: any, password: any, admin: any) {
        return fetch(this.api.update, {
            method: 'post',
            body: JSON.stringify({ userId, user: { name, password, admin } }),
            headers: this.createHeaders()
        })
            .then(res => res.json())
            .then(res => res.data);
    }

    public createUser(name: any, password: any, admin: any) {
        return fetch(this.api.create, {
            method: 'post',
            body: JSON.stringify({ name, password, admin }),
            headers: this.createHeaders()
        })
            .then(res => res.json())
            .then(res => res.data);
    }

    public deleteUser(userId: string) {
        return fetch(this.api.delete + userId, { method: 'delete', headers: this.createHeaders() })
            .then(res => res.json())
            .then(res => res.data);
    }

    public getUsers() {
        return fetch(this.api.all, { headers: this.createHeaders() })
            .then(res => res.json())
            .then(res => res.data);
    }

    public getUser(id: string | number) {
        return fetch(this.api.get + id, { headers: this.createHeaders() })
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

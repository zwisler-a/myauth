import { AuthService } from './auth.service';
import { User } from '@/model/user.interface';

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
            .then(this.unpackResponse());
    }

    public createUser(name: any, password: any, admin: any) {
        return fetch(this.api.create, {
            method: 'post',
            body: JSON.stringify({ name, password, admin }),
            headers: this.createHeaders()
        })
            .then(res => res.json())
            .then(this.unpackResponse());
    }

    public deleteUser(userId: string) {
        return fetch(this.api.delete + userId, { method: 'delete', headers: this.createHeaders() })
            .then(res => res.json())
            .then(this.unpackResponse());
    }

    public getUsers() {
        return fetch(this.api.all, { headers: this.createHeaders() })
            .then(res => res.json())
            .then(this.unpackResponse());
    }

    public getUser(id: string | number): Promise<User> {
        return fetch(this.api.get + id, { headers: this.createHeaders() })
            .then(res => res.json())
            .then(this.unpackResponse())
            .then(userObj => new User(userObj.id, userObj.name, userObj.password, userObj.admin));
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

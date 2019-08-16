import { Service } from '@zwisler/bridge';

import { User } from '../model/user.model';
import { JwtService } from './jwt.service';
import { PropertyService } from './property.service';
import { RealmService } from './realm.service';
import { UserService } from './user.service';
import { Realm } from '../model/realm.model';
import { LogService } from './log.service';
import { InvalidLoginError } from '../error/invalid-login.error';
import { InvalidRedirectError } from '../error/invalid-redirect.error';
import { InvalidSignInTokenError } from '../error/invalid-signintoken.error';

const bcrypt = require('bcryptjs');
const uuid = require('uuid/v1');

@Service()
export class AuthService {
    realmTokens: {} = {};
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private realmService: RealmService,
        private propService: PropertyService
    ) {}

    public async getSignInToken(username: string, password: string, realmId: string, redirect: string) {
        const user = await this.userService.getUserByName(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new InvalidLoginError();
        }
        const realm = await this.realmService.get(realmId);
        this.checkRedirect(redirect, realm);
        const signInToken = await this.createSignInToken(user, realm);
        const cookieToken = this.createCookieToken(user);
        return { cookieToken, signInToken };
    }

    public async getSignInTokenWithCookie(cookie: string, realmId: string, redirect: string) {
        const userId = this.jwtService.verify(cookie).id;
        if (!userId) throw new Error('Cookie token does not contain a user id!');
        const user = await this.userService.getUser(userId);
        if (!user) throw new Error('Invalid user id!');
        const realm = await this.realmService.get(realmId);
        this.checkRedirect(redirect, realm);
        return await this.createSignInToken(user, realm);
    }

    public getRealmToken(signInToken) {
        const payload = this.jwtService.verify(signInToken);
        const token = this.realmTokens[payload.id];
        delete this.realmTokens[payload.id];
        if (!token) throw new InvalidSignInTokenError();
        return token;
    }

    private checkRedirect(redirect: string, realm: Realm) {
        if (realm && !new RegExp(realm.domains).test(redirect)) throw new InvalidRedirectError();
    }

    private async createRealmToken(user: User, realm?: Realm) {
        delete user.password;
        const jwtPayload = {
            id: user.id,
            name: user.name,
            admin: user.admin,
            realmId: realm ? realm.id : undefined
        };
        if (realm && realm.properties) {
            const propPromises = realm.properties.map(async propDef => {
                const props = await this.propService.get(user.id, propDef.id);
                return { name: propDef.name, defId: propDef.id, value: props.value };
            });
            jwtPayload['properties'] = await Promise.all(propPromises);
        }
        return this.jwtService.createToken(jwtPayload, realm ? realm.secret : undefined);
    }

    private async createSignInToken(user: User, realm?: Realm) {
        const id = uuid();
        const signInToken = this.jwtService.createToken({ id });
        this.realmTokens[id] = await this.createRealmToken(user, realm);
        setTimeout(() => {
            delete this.realmTokens[id];
        }, 60 * 1000);
        return signInToken;
    }

    private createCookieToken(user: User) {
        return this.jwtService.createToken({ id: user.id, name: user.name, admin: user.admin });
    }

    async register(username: string, password: string) {
        const user = await this.userService.create(username, password);
        delete user.password;
        return user;
    }
}

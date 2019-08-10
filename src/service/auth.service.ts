import { Service } from '@zwisler/bridge';

import { User } from '../model/user.model';
import { JwtService } from './jwt.service';
import { PropertyService } from './property.service';
import { RealmService } from './realm.service';
import { UserService } from './user.service';

const bcrypt = require('bcryptjs');
const uuid = require('uuid/v1');

@Service()
export class AuthService {
    realmTokens: {} = {};
    constructor(private userService: UserService, private jwtService: JwtService, private realmService: RealmService, private propService: PropertyService) {}

    async getSignInToken(username: string, password: string, realmId: string) {
        const user = await this.userService.getUserByName(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Cant authenticate User!');
        }
        const realmToken = this.createRealmToken(user, realmId);
        return [this.createSignInToken(realmToken), this.createUserToken(user)];
    }

    createUserToken(user: User) {
        return this.jwtService.createToken({ id: user.id, name: user.name, admin: user.admin });
    }

    async createRealmToken(user: User, realmId: string) {
        delete user.password;
        const jwtPayload = {
            id: user.id,
            name: user.name,
            admin: user.admin,
            realmId: realmId
        };
        const realm = await this.realmService.get(realmId);
        if (realm && realm.properties) {
            const propPromises = realm.properties.map(async propDef => {
                const props = await this.propService.get(user.id, propDef.id);
                return { name: propDef.name, defId: propDef.id, value: props.value };
            });
            jwtPayload['properties'] = await Promise.all(propPromises);
        }
        return this.jwtService.createToken(jwtPayload, realm ? realm.secret : undefined);
    }

    createSignInToken(realmToken) {
        const id = uuid();
        const signInToken = this.jwtService.createToken({ id });
        this.realmTokens[id] = realmToken;
        setTimeout(() => {
            delete this.realmTokens[id];
        }, 60 * 1000);
        return signInToken;
    }

    getRealmToken(signInToken) {
        const payload = this.jwtService.verify(signInToken);
        const token = this.realmTokens[payload.id];
        delete this.realmTokens[payload.id];
        if (!token) throw new Error('Invalid token!');
        return token;
    }

    async register(username: string, password: string) {
        const user = await this.userService.create(username,password);
        delete user.password;
        return user;
    }
}

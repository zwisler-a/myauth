import { Service } from '@zwisler/bridge';

import { UserService } from './user.service';
import { JwtService } from './jwt.service';
import { RealmService } from './realm.service';
import { PropertyService } from './property.service';
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v1');

@Service()
export class AuthService {
    loginTokens: {} = {};
    constructor(private userService: UserService, private jwtService: JwtService, private realmService: RealmService, private propService: PropertyService) {}

    async login(username: string, password: string, realmId?: string) {
        const user = await this.userService.getUserByName(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Cant authenticate User!');
        }
        delete user.password;
        const jwtPayload = {
            id: user.id,
            name: user.name
        };
        if (realmId && realmId != '') {
            const realm = await this.realmService.get(realmId);
            if (realm.properties) {
                const propPromises = realm.properties.map(async propDef => {
                    const props = await this.propService.get(user.id, propDef.id);
                    return { name: propDef.name, defId: propDef.id, values: props };
                });
                jwtPayload['properties'] = await Promise.all(propPromises);
            }
        }
        return this.createLoginToken(this.jwtService.createToken(jwtPayload));
    }

    createLoginToken(token) {
        const loginToken = uuid();
        this.loginTokens[loginToken] = token;
        setTimeout(() => {
            delete this.loginTokens[loginToken];
        }, 60 * 1000);
        return loginToken;
    }

    getLoginToken(loginToken) {
        const token = this.loginTokens[loginToken];
        delete this.loginTokens[loginToken];
        if (!token) throw new Error('Invalid token!');
        return token;
    }

    async register(username: string, password: string) {
        if (await this.userService.userExists(username)) {
            throw new Error('Username already exists');
        }
        const user = await this.userService.create(username, await bcrypt.hash(password, 8));
        delete user.password;
        return user;
    }
}

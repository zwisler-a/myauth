import { Endpoint, Route, CustomParam, NoResponse } from '@zwisler/bridge';

import { AuthService } from '../service/auth.service';
import { RealmService } from '../service/realm.service';
import { UserService } from '../service/user.service';
import { JwtService } from '../service/jwt.service';
const fs = require('fs');
const path = require('path');

@Route({ basePath: '/auth' })
export class AuthRoute {
    readonly COOKIE_NAME = 'auth';

    constructor(private authService: AuthService, private realmService: RealmService, private userService: UserService, private jwtService: JwtService) {}

    @Endpoint({ route: 'login' })
    async loginPage(realmId: string, redirect: string, @CustomParam('express-request') req, @CustomParam('express-response') res) {
        const authCookie = req.cookies[this.COOKIE_NAME];
        if (authCookie) {
            const userId = this.jwtService.verify(authCookie).userId;
            const user = await this.userService.getUser(userId);
            res.redirect(redirect + '?token=' + this.authService.createSignInToken(await this.authService.createRealmToken(user, realmId)));
        }

        res.sendFile(path.join(__dirname, '../ui/index.html'));
        return new NoResponse();
    }

    @Endpoint()
    logout(redirect: string, @CustomParam('express-response') res) {
        res.clearCookie(this.COOKIE_NAME);
        res.redirect(redirect);
        return new NoResponse();
    }

    @Endpoint({ method: 'POST' })
    async login(username: string, password: string, realmId: string, redirect: string, @CustomParam('express-response') res) {
        try {
            const [token, userToken] = await this.authService.getSignInToken(username, password, realmId);
            // TODO check redirects
            res.cookie(this.COOKIE_NAME, userToken, { maxAge: 900000, httpOnly: true });
            res.redirect(redirect + '?token=' + token);
        } catch (e) {
            res.redirect('/index.html?error=true');
        }
        return new NoResponse();
    }

    @Endpoint()
    getToken(signInToken: string) {
        return this.authService.getRealmToken(signInToken);
    }

    @Endpoint({ method: 'POST', middleware: [JwtService.authenticate()] })
    register(username: string, password: string) {
        return this.authService.register(username, password);
    }
}

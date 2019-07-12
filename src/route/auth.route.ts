import { Endpoint, Route, CustomParam, NoResponse } from '@zwisler/bridge';

import { AuthService } from '../service/auth.service';
import { RealmService } from '../service/realm.service';
const fs = require('fs');
const path = require('path');

@Route({ basePath: '/auth' })
export class AuthRoute {
    constructor(private authService: AuthService, private realmService: RealmService) {}

    @Endpoint({ route: 'login' })
    loginPage(realmId: string, redirect: string, @CustomParam('express-response') req, @CustomParam('express-response') res) {
        const authCookie = req.cookies['auth'];
        if (authCookie) {
            res.redirect(redirect + '?token=' + this.authService.createLoginToken(authCookie));
        }

        res.sendFile('/ui/index.html');
        return new NoResponse();
    }

    @Endpoint({ method: 'POST' })
    async login(username: string, password: string, realmId: string, redirect: string, @CustomParam('express-response') res) {
        try {
            const token = await this.authService.login(username, password, realmId);
            const realm = await this.realmService.get(realmId);
            if (!realm) throw new Error('Unknown realm!');
            // TODO check redirects
            res.redirect(redirect + '?token=' + token);
        } catch (e) {
            res.redirect('/index.html?error=true');
        }
    }

    @Endpoint()
    getToken(loginToken: string) {
        return this.authService.getLoginToken(loginToken);
    }

    @Endpoint({ method: 'POST' })
    register(username: string, password: string) {
        return this.authService.register(username, password);
    }
}

import { Endpoint, Route, CustomParam, NoResponse } from '@zwisler/bridge';

import { AuthService } from '../service/auth.service';
import { RealmService } from '../service/realm.service';
import { UserService } from '../service/user.service';
import { JwtService } from '../service/jwt.service';
import { BridgeError } from '@zwisler/bridge/core/util/bridge.error';
import { InvalidLoginError } from '../error/invalid-login.error';
import { LogService } from '../service/log.service';
const fs = require('fs');
const path = require('path');

// TODO remove when bridge has Optional params
const removeQuery = toRemove => (req, res, next) => {
    delete req.query[toRemove];
    next();
};

@Route({ basePath: '/auth' })
export class AuthRoute {
    readonly COOKIE_NAME = 'auth';

    constructor(
        private authService: AuthService,
        private realmService: RealmService,
        private userService: UserService,
        private logService: LogService
    ) {}

    @Endpoint({
        route: 'login',
        middleware: [removeQuery('error')]
    })
    async loginPage(
        realmId: string,
        redirect: string,
        @CustomParam('express-request') req,
        @CustomParam('express-response') res
    ) {
        // Check if user already is logged in
        const authCookie = req.cookies[this.COOKIE_NAME];
        if (authCookie) {
            const signInToken = await this.authService.getSignInTokenWithCookie(authCookie, realmId, redirect);
            res.redirect(redirect + '?token=' + signInToken);
            return new NoResponse();
        }
        // User is not logged in, send login-page
        const customStyleIdentifier = '<!-- $custom-styles -->';
        let loginPage: string = fs.readFileSync(path.join(__dirname, '../ui/login.html')).toString();
        const realm = await this.realmService.get(realmId);
        if (realm) {
            loginPage = loginPage.replace(customStyleIdentifier, '<style>' + realm.customStyles + '</style>');
        }
        res.send(loginPage);
        return new NoResponse();
    }

    @Endpoint({ method: 'POST', middleware: [removeQuery('error')] })
    async login(username: string, password: string, realmId: string, redirect: string, @CustomParam('express-response') res) {
        try {
            const { cookieToken, signInToken } = await this.authService.getSignInToken(username, password, realmId, redirect);
            this.logService.log(`User ${username} signed in.`);
            res.cookie(this.COOKIE_NAME, cookieToken, { expires: new Date(253402300000000), httpOnly: true });
            res.redirect(redirect + '?token=' + signInToken);
        } catch (e) {
            if (!(e instanceof InvalidLoginError)) throw e;
            res.redirect('/api/auth/login?error=true&realmId=' + realmId + '&redirect=' + redirect);
        }
        return new NoResponse();
    }

    @Endpoint()
    logout(redirect: string, @CustomParam('express-response') res) {
        res.clearCookie(this.COOKIE_NAME);
        res.redirect(redirect);
        return new NoResponse();
    }

    @Endpoint()
    getToken(signInToken: string) {
        return this.authService.getRealmToken(signInToken);
    }

    @Endpoint({ method: 'POST', middleware: [JwtService.authenticate()] })
    register(username: string, password: string) {
        throw new Error('Not yet implemented!');
        return this.authService.register(username, password);
    }

    @Endpoint({ method: 'POST' })
    async createFirstUser(name: string, password: string) {
        if (!(await this.userService.hasUsers())) {
            const updatedUser = await this.userService.create(name, password, true);
            delete updatedUser.password;
            return updatedUser;
        }
        throw new BridgeError(401, '');
    }
}

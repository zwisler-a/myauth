import { Endpoint, Route, CustomParam, NoResponse } from '@zwisler/bridge';

import { AuthService } from '../service/auth.service';
import { RealmService } from '../service/realm.service';
import { UserService } from '../service/user.service';
import { JwtService } from '../service/jwt.service';
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

    constructor(private authService: AuthService, private realmService: RealmService, private userService: UserService, private jwtService: JwtService) {}

    @Endpoint({
        route: 'login',
        middleware: [removeQuery('error')]
    })
    async loginPage(realmId: string, redirect: string, @CustomParam('express-request') req, @CustomParam('express-response') res) {
        const authCookie = req.cookies[this.COOKIE_NAME];
        if (authCookie) {
            const userId = this.jwtService.verify(authCookie).userId;
            const user = await this.userService.getUser(userId);
            res.redirect(redirect + '?token=' + this.authService.createSignInToken(await this.authService.createRealmToken(user, realmId)));
            return new NoResponse();
        }
        const customStyleIdentifier = '<!-- $custom-styles -->';
        let loginPage: string = fs.readFileSync(path.join(__dirname, '../ui/login.html')).toString();
        const realm = await this.realmService.get(realmId);
        if (realm) {
            loginPage = loginPage.replace(customStyleIdentifier, '<style>' + realm.customStyles + '</style>');
        }
        res.send(loginPage);
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
            res.redirect('/auth/login?error=true&realmId=' + realmId + '&redirect=' + redirect);
        }
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
}

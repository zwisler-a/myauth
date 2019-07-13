import { REDIRECT_TO, LOGIN_URL, REALM_ID } from '../env/env.js';

export class AuthService {
    static getInstance() {
        if (this._instance) return this._instance;
        return (this._instance = new AuthService());
    }

    constructor() {
        this._urls = {
            getToken: '/auth/getToken?signInToken=',
            login: LOGIN_URL + '?redirect=' + encodeURIComponent(REDIRECT_TO) + '&realmId=' + REALM_ID
        };
    }

    getToken(loginToken) {
        return fetch(this._urls.getToken + loginToken)
            .then(res => res.json())
            .then(res => {
                if (res.error) return (window.location = this._urls.login);
                this._token = res.data;
                window.history.replaceState({}, document.title, '/' + 'admin.html');
                return this._token;
            });
    }

    async checkLogin() {
        const storedToken = localStorage.getItem('token');
        if (storedToken) return;
        const queryToken = this._getParameterByName('token');
        if (queryToken) return this.getToken(queryToken);
        window.location = this._urls.login;
    }

    _getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}

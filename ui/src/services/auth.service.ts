export class AuthService {
    public static logout(): any {
        window.location.href =
            // tslint:disable-next-line:max-line-length
            this.urls.logout + '?redirect=' + encodeURIComponent(location.protocol + '//' + location.host + location.pathname);
    }
    public static async checkLogin() {
        const queryToken = AuthService._getParameterByName('token');
        if (queryToken) {
            return this.getToken(queryToken);
        }
        window.location.href = AuthService.urls.login();
        throw new Error('Not logged in!');
    }

    public static getAuthToken() {
        return this.token;
    }

    public static getUserData() {
        if (!this.token || !(this.token.split('.').length >= 1)) return '';
        return JSON.parse(atob(this.token.split('.')[1]));
    }

    private static token: any;
    private static urls = {
        getToken: '/api/auth/getToken?signInToken=',
        logout: process.env.VUE_APP_AUTH_HOST + 'api/auth/logout',
        login: () =>
            process.env.VUE_APP_AUTH_HOST +
            'api/auth/login' +
            '?redirect=' +
            encodeURIComponent(location.protocol + '//' + location.host + location.pathname) +
            '&realmId=' +
            process.env.VUE_APP_REALM_ID
    };

    private static getToken(loginToken: string) {
        return fetch(AuthService.urls.getToken + loginToken)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return (window.location.href = AuthService.urls.login());
                }
                this.token = res.data;
                window.history.replaceState({}, document.title, location.pathname);
                return this.token;
            });
    }

    private static _getParameterByName(name: string, url?: string) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}

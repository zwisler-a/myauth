export class AuthService {
    static getInstance() {
        if (this._instance) return this._instance;
        return (this._instance = new AuthService());
    }

    constructor() {
        this._urls = {
            getToken: '/auth/getToken?signInToken=',
            login: '/auth/login?redirect=' + encodeURIComponent('http://localhost:3333/admin.html') + '&realmId=' + '6826dd1b-33c0-457c-b0ae-cb844702f742'
        };
    }

    getToken(loginToken) {
        fetch(this._urls.getToken + loginToken)
            .then(res => res.json())
            .then(res => {
                if (res.error) return (window.location = this._urls.login);
                this._token = res.data;
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

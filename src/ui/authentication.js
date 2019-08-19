window.myauth = (function() {
    const script = document.currentScript;

    const HOST = script.src.replace('authentication.js', '');
    const REALM_ID = script.getAttribute('realm') || '';
    const FETCH_TOKEN = HOST + 'api/auth/getToken?signInToken=';
    const LOGOUT_URL = HOST + 'api/auth/logout?redirect=';
    const LOGIN_URL = () =>
        HOST +
        'api/auth/login' +
        '?redirect=' +
        encodeURIComponent(location.protocol + '//' + location.host + location.pathname) +
        '&realmId=' +
        REALM_ID;

    let authToken = null;

    function getParameterByName(name) {
        const url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function checkLogin() {
        const queryToken = getParameterByName('token');
        if (queryToken) return fetchToken(queryToken);
        window.location.href = LOGIN_URL();
        return new Promise(_ => {});
    }

    function fetchToken(signInToken) {
        return fetch(FETCH_TOKEN + signInToken)
            .then(res => res.json())
            .then(res => {
                if (res.error) return (window.location.href = LOGIN_URL());
                authToken = res.data;
                window.history.replaceState({}, document.title, location.pathname);
            });
    }

    function returnToken() {
        return authToken;
    }

    function logout(redirectTo) {
        window.location.href = LOGOUT_URL + redirectTo;
    }

    return {
        authenticate: checkLogin,
        getToken: returnToken,
        logout: logout
    };
})();

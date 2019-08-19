declare const myauth: { authenticate: () => void; getToken: () => string; logout: (redirect: string) => void };

export class AuthService {
    public static logout(): any {
        myauth.logout(encodeURIComponent(location.protocol + '//' + location.host + location.pathname));
    }

    public static getAuthToken() {
        return myauth.getToken();
    }

    public static async getUserData(): Promise<any> {
        if (!(this.getAuthToken().split('.').length >= 1)) return {};
        return JSON.parse(atob(this.getAuthToken().split('.')[1]));
    }
}

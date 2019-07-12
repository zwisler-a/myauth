export class RealmService {
    static getInstance() {
        if (this._instance) return this._instance;
        return (this._instance = new RealmService());
    }

    constructor() {
        this._api = {
            all: 'realm/get'
        };
    }

    getRealms() {
        return fetch(this._api.all)
            .then(res => res.json())
            .then(res => {
                this._realms = res.data;
                return this._realms;
            });
    }

    async getRealm(id) {
        if (!this._realms) await this.getRealms();
        return this._realms.find(realm => realm.id === id);
    }
}

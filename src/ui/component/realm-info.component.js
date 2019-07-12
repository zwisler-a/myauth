import { RealmService } from '../service/realm.service.js';

export class RealmInfoComponent extends HTMLElement {
    static TAG = 'auth-realm-info';
    constructor() {
        super();
        this._realmService = RealmService.getInstance();
    }

    async connectedCallback() {
        const realm = await this._realmService.getRealm(this.getAttribute('realmid'));
        this.displayRealm(realm);
    }

    displayRealm(realm) {
        this.innerHTML = `
            <h1>${realm.name}</h1>
            <h5>${realm.id}</h5>
            <div>Domains: ${realm.domains} </div>
            <div>Properties: 
                <ul>${realm.properties.map(prop => `<li>${prop.name}</li>`)}</ul>
            </div>
        `;
    }
}

window.customElements.define(RealmInfoComponent.TAG, RealmInfoComponent);

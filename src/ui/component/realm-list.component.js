import { RealmService } from '../service/realm.service.js';

export class RealmListComponent extends HTMLElement {
    static TAG = 'auth-realm-list';
    constructor() {
        super();
        this._realmService = RealmService.getInstance();
        this.addEventListener('click', this.onClick.bind(this));
    }

    async connectedCallback() {
        const realms = await this._realmService.getRealms();
        this.createList(realms);
    }

    onClick(event) {
        const clickedEl = event.target.closest('div');
        if (this._realmInfoComponent) this.removeChild(this._realmInfoComponent);
        this._realmInfoComponent = document.createElement('auth-realm-info');
        this._realmInfoComponent.setAttribute('realmId', clickedEl.getAttribute('id'));
        this.appendChild(this._realmInfoComponent);
    }

    createList(realms) {
        realms.forEach(realm => {
            const el = document.createElement('div');
            el.setAttribute('id', realm.id);
            el.innerText = realm.name;
            this.appendChild(el);
        });
    }
}

window.customElements.define(RealmListComponent.TAG, RealmListComponent);

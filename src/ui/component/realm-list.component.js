import { RealmService } from '../service/realm.service.js';

export class RealmListComponent extends HTMLElement {
    static TAG = 'auth-realm-list';
    constructor() {
        super();
        this._realmService = RealmService.getInstance();

        this.addEventListener('click', this.onClick.bind(this));
    }

    connectedCallback() {
        this._loadList();
        this.addEventListener('realm_created', async event => {
            await this._loadList();
            this._displayRealm(event.detail);
        });
        this.addEventListener('realm_deleted', () => {
            this._loadList();
        });
    }

    async _loadList() {
        const realms = await this._realmService.getRealms();
        this.createList(realms);
    }

    onClick(event) {
        const clickedEl = event.target.closest('div');
        if (!clickedEl || !clickedEl.hasAttribute('id') || !clickedEl.hasAttribute('realm-list-el')) return;
        this._displayRealm(clickedEl.getAttribute('id'));
    }

    _displayRealm(id) {
        if (this._displayComponent) this.removeChild(this._displayComponent);
        this._displayComponent = document.createElement('auth-realm-info');
        this._displayComponent.setAttribute('realmId', id);
        this.appendChild(this._displayComponent);
    }

    createList(realms) {
        this.innerHTML = '';
        this._displayComponent = undefined;
        const list = document.createElement('div');
        list.classList.add('realm-list');
        realms.forEach(realm => {
            const el = document.createElement('div');
            el.setAttribute('id', realm.id);
            el.setAttribute('realm-list-el', true);
            el.innerText = realm.name;
            list.appendChild(el);
        });

        const newRealmBtn = document.createElement('button');
        newRealmBtn.innerText = 'Neues Realm erstellen';
        newRealmBtn.addEventListener('click', this.createNewRealm.bind(this));
        list.appendChild(newRealmBtn);

        const spacer = document.createElement('span');
        spacer.style.flex = '1 1 auto';
        list.appendChild(spacer);

        list.appendChild(document.createElement('auth-logout'));

        this.appendChild(list);
    }

    createNewRealm() {
        if (this._displayComponent) this.removeChild(this._displayComponent);
        this._displayComponent = document.createElement('auth-realm-create');
        this.appendChild(this._displayComponent);
    }
}

window.customElements.define(RealmListComponent.TAG, RealmListComponent);

import { RealmService } from '../service/realm.service.js';

export class RealmInfoComponent extends HTMLElement {
    static TAG = 'auth-realm-info';
    constructor() {
        super();
        this._realmService = RealmService.getInstance();
    }

    async connectedCallback() {
        this.innerText = 'Loading ...';
        const realm = await this._realmService.getRealm(this.getAttribute('realmid'));
        this.innerText = '';
        this._createRealmInfo(realm);
        this._createActions();
        this._update();
    }

    _createActions() {
        this._actions = document.createElement('div');
        this._actions.classList.add('actions');

        const btnEdit = document.createElement('button');
        btnEdit.innerText = 'Update Realm';
        btnEdit.addEventListener('click', this._updateRealm.bind(this));

        const btnDelete = document.createElement('button');
        btnDelete.addEventListener('click', this._deleteRealm.bind(this));
        btnDelete.innerText = 'Delete';

        const headline = document.createElement('div');
        headline.classList.add('headline');
        headline.innerText = 'Realm Info';
        this._actions.appendChild(headline);

        const spacer = document.createElement('span');
        spacer.style.flex = '1 1 auto';
        this._actions.appendChild(spacer);

        this._actions.appendChild(btnEdit);
        this._actions.appendChild(btnDelete);
    }

    async _deleteRealm() {
        await this._realmService.deleteRealm(this.getAttribute('realmId'));
        this.dispatchEvent(new CustomEvent('realm_deleted', { bubbles: true }));
    }

    async _updateRealm() {
        if (!this._inputs) return;
        const updatedRealm = await this._realmService.updateRealm({
            id: this._inputs.id.value,
            name: this._inputs.name.value,
            secret: this._inputs.secret.value,
            customStyles: this._inputs.customStyles.value,
            domains: this._inputs.domains.value
        });

        this._createRealmInfo(updatedRealm);
        this._update();
    }

    _createRealmInfo(realm) {
        this._realmInfo = document.createElement('div');
        const name = this._createInput('Name', realm.name, this._realmInfo);
        const id = this._createInput('ID', realm.id, this._realmInfo, true);
        const domains = this._createInput('Domains', realm.domains, this._realmInfo);
        const secret = this._createInput('Secret', realm.secret, this._realmInfo);
        const customStyles = this._createInput('custom Styles', realm.customStyles, this._realmInfo);
        this._inputs = {
            name,
            id,
            domains,
            secret,
            customStyles
        };

        const properties = document.createElement('auth-realm-properties');
        properties.setAttribute('realmId', realm.id);
        this._realmInfo.appendChild(properties);
    }

    _update() {
        this.innerHTML = '';
        this.appendChild(this._actions);
        this.appendChild(this._realmInfo);
    }

    _createInput(name, value, parent, disabled) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('input-wrapper');
        wrapper.innerHTML = `<span class="input-label">${name}: </span>`;
        const input = document.createElement('input');
        input.value = value;
        if (disabled) input.readOnly = true;
        wrapper.appendChild(input);
        parent.appendChild(wrapper);
        return input;
    }
}

window.customElements.define(RealmInfoComponent.TAG, RealmInfoComponent);

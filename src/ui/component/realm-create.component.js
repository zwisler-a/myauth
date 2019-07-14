import { RealmService } from '../service/realm.service.js';

export class RealmCreateComponent extends HTMLElement {
    static TAG = 'auth-realm-create';
    constructor() {
        super();
        this._realmService = RealmService.getInstance();
    }

    async connectedCallback() {
        this._createRealmInfo();
        this._createActions();
        this._update();
    }

    _createActions() {
        this._actions = document.createElement('div');
        this._actions.classList.add('actions');

        const btnCreate = document.createElement('button');
        btnCreate.innerText = 'Save';
        btnCreate.addEventListener('click', this.createRealm.bind(this));

        this._actions.appendChild(btnCreate);
    }

    async createRealm() {
        if (!this._inputs) return;
        const realm = await this._realmService.createRealm({
            name: this._inputs.name.value,
            secret: this._inputs.secret.value,
            domains: this._inputs.domains.value,
            customStyles: this._inputs.customStyles.value
        });
        this.dispatchEvent(new CustomEvent('realm_created', { bubbles: true, detail: realm.id }));
    }

    _createRealmInfo() {
        this._newRealmInfo = document.createElement('div');
        const name = this._createInput('Name', '', this._newRealmInfo);
        const domains = this._createInput('Domains', '', this._newRealmInfo);
        const secret = this._createInput('Secret', '', this._newRealmInfo);
        const customStyles = this._createInput('Custom Styles', '', this._newRealmInfo);
        this._inputs = {
            name,
            domains,
            secret,
            customStyles
        };
    }

    _update() {
        this.innerHTML = '';
        this.appendChild(this._actions);
        this.appendChild(this._newRealmInfo);
    }

    _createInput(name, value, parent, disabled) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `<span class="input-label">${name}: </span>`;
        const input = document.createElement('input');
        input.value = value;
        if (disabled) input.readOnly = true;
        wrapper.appendChild(input);
        parent.appendChild(wrapper);
        return input;
    }
}

window.customElements.define(RealmCreateComponent.TAG, RealmCreateComponent);

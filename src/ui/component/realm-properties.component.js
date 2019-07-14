import { PropService } from '../service/prop.service.js';

export class RealmPropertiesComponent extends HTMLElement {
    static TAG = 'auth-realm-properties';
    constructor() {
        super();
        this._propService = PropService.getInstance();
    }

    async connectedCallback() {
        this._createActions();
        await this.loadProperties();
        this._update();
    }

    _createActions() {
        this._actions = document.createElement('div');
        this._actions.classList.add('actions');

        const btnUpdate = document.createElement('button');
        btnUpdate.innerText = 'Update Properties';
        btnUpdate.addEventListener('click', this._updateProperties.bind(this));

        const btnAdd = document.createElement('button');
        btnAdd.addEventListener('click', this._addProperty.bind(this));
        btnAdd.innerText = 'Add Property';

        const headline = document.createElement('div');
        headline.classList.add('headline');
        headline.innerText = 'Realm Properties';
        this._actions.appendChild(headline);

        const spacer = document.createElement('span');
        spacer.style.flex = '1 1 auto';
        this._actions.appendChild(spacer);

        this._actions.appendChild(btnAdd);
        this._actions.appendChild(btnUpdate);
    }

    _updateProperties() {
        this._propertiesInput.querySelectorAll('.property').forEach(wrapper => {
            if (wrapper.hasAttribute('id')) {
                this._propService.updateDefinition(wrapper.getAttribute('id'), wrapper.querySelector('input').value);
            } else {
                this._propService.createDefinition(this.getAttribute('realmId'), wrapper.querySelector('input').value);
            }
        });
    }

    _addProperty() {
        this._appendPropertyInput('New Property', this._propertiesInput);
        this._update();
    }

    async _deleteProperty(definitionId, wrapper) {
        if (!definitionId) {
            this._propertiesInput.removeChild(wrapper);
        }
        await this._propService.deleteDefinition(definitionId);
        await this.loadProperties();
        this._update();
    }

    async loadProperties() {
        this._propertiesInput = document.createElement('div');
        const definitions = await this._propService.getDefinitions(this.getAttribute('realmId'));
        definitions.forEach(definition => {
            this._appendPropertyInput(definition.name, this._propertiesInput, definition.id);
        });
    }

    _appendPropertyInput(name, parent, id) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('property');
        if (id) wrapper.setAttribute('id', id);
        const input = document.createElement('input');
        const btnDelete = document.createElement('button');
        btnDelete.addEventListener('click', this._deleteProperty.bind(this, id, wrapper));
        btnDelete.innerText = 'delete';
        input.value = name;
        wrapper.appendChild(input);
        wrapper.appendChild(btnDelete);
        parent.appendChild(wrapper);
    }

    _update() {
        this.innerHTML = '';
        this.appendChild(this._actions);
        this.appendChild(this._propertiesInput);
    }
}

window.customElements.define(RealmPropertiesComponent.TAG, RealmPropertiesComponent);

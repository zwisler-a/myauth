import { UserService } from '../service/user.service.js';

export class UserInfoComponent extends HTMLElement {
    static TAG = 'auth-user-info';
    constructor() {
        super();
        this._userService = UserService.getInstance();
    }

    async connectedCallback() {
        this.innerText = 'Loading ...';
        const realm = await this._userService.getUser(this.getAttribute('userId'));
        this.innerText = '';
        this._createUserInfo(realm);
        this._createActions();
        this._update();
    }

    _createActions() {
        this._actions = document.createElement('div');
        this._actions.classList.add('actions');

        const btnEdit = document.createElement('button');
        btnEdit.innerText = 'Update User';
        btnEdit.addEventListener('click', this._updateUser.bind(this));

        const btnDelete = document.createElement('button');
        btnDelete.addEventListener('click', this._deleteUser.bind(this));
        btnDelete.innerText = 'Delete';

        const headline = document.createElement('div');
        headline.classList.add('headline');
        headline.innerText = 'User Info';
        this._actions.appendChild(headline);

        const spacer = document.createElement('span');
        spacer.style.flex = '1 1 auto';
        this._actions.appendChild(spacer);

        this._actions.appendChild(btnEdit);
        this._actions.appendChild(btnDelete);
    }

    async _deleteUser() {
        await this._userService.deleteUser(this.getAttribute('userId'));
        this.dispatchEvent(new CustomEvent('reload_users', { bubbles: true, detail: true }));
    }

    async _updateUser() {
        if (!this._inputs) return;
        const updatedRealm = await this._userService.updateUser(
            this._inputs.id.value,
            this._inputs.name.value,
            this._inputs.password.value,
            this._inputs.admin.checked
        );

        this.dispatchEvent(new CustomEvent('reload_users', { bubbles: true }));

        this._createUserInfo(updatedRealm);
        this._update();
    }

    _createUserInfo(user) {
        this._userInfo = document.createElement('div');
        const name = this._createInput('Name', user.name, this._userInfo);
        const id = this._createInput('ID', user.id, this._userInfo, true);
        const password = this._createInput('Password', '', this._userInfo, false, 'password');

        const admin = this._createInput('Admin', user.admin, this._userInfo, false, 'checkbox');

        this._inputs = {
            name,
            id,
            password,
            admin
        };
    }

    _update() {
        this.innerHTML = '';
        this.appendChild(this._actions);
        this.appendChild(this._userInfo);
    }

    _createInput(name, value, parent, disabled, type) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('input-wrapper');
        wrapper.innerHTML = `<span class="input-label">${name}: </span>`;
        const input = document.createElement('input');
        input.value = value;
        if (disabled) input.readOnly = true;
        if (type) input.setAttribute('type', type);
        if (type === 'checkbox') input.checked = value;
        wrapper.appendChild(input);
        parent.appendChild(wrapper);
        return input;
    }
}

window.customElements.define(UserInfoComponent.TAG, UserInfoComponent);

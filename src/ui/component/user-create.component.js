import { UserService } from '../service/user.service.js';

export class UserCreateComponent extends HTMLElement {
    static TAG = 'auth-user-create';
    constructor() {
        super();
        this._userService = UserService.getInstance();
    }

    async connectedCallback() {
        this._createUserInfo();
        this._createActions();
        this._update();
    }

    _createActions() {
        this._actions = document.createElement('div');
        this._actions.classList.add('actions');

        const btnCreate = document.createElement('button');
        btnCreate.innerText = 'Save';
        btnCreate.addEventListener('click', this.createUser.bind(this));

        const spacer = document.createElement('span');
        spacer.style.flex = '1 1 auto';
        this._actions.appendChild(spacer);

        this._actions.appendChild(btnCreate);
    }

    async createUser() {
        if (!this._inputs) return;
        const user = await this._userService.createUser(this._inputs.name.value, this._inputs.password.value, this._inputs.admin.checked);
        this.dispatchEvent(new CustomEvent('load_user', { bubbles: true, detail: user.id }));
    }

    _createUserInfo() {
        this._userInfo = document.createElement('div');
        const name = this._createInput('Name', '', this._userInfo);
        const password = this._createInput('Password', '', this._userInfo, false, 'password');

        const admin = this._createInput('Admin', false, this._userInfo, false, 'checkbox');

        this._inputs = {
            name,
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

window.customElements.define(UserCreateComponent.TAG, UserCreateComponent);

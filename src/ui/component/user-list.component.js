import { UserService } from '../service/user.service.js';

export class UserListComponent extends HTMLElement {
    static TAG = 'auth-user-list';
    constructor() {
        super();
        this._userService = UserService.getInstance();

        this.addEventListener('click', this.onClick.bind(this));
    }

    connectedCallback() {
        this._loadList();
        this.addEventListener('load_user', async event => {
            await this._loadList();
            this._displayUser(event.detail);
        });
        this.addEventListener('reload_users', event => {
            if (event.detail) this._displayComponent = undefined;
            this._loadList();
        });
    }

    async _loadList() {
        const users = await this._userService.getUsers();
        this.createList(users);
    }

    onClick(event) {
        const clickedEl = event.target.closest('div');
        if (!clickedEl || !clickedEl.hasAttribute('id') || !clickedEl.hasAttribute('user-list-el')) return;
        this._displayUser(clickedEl.getAttribute('id'));
    }

    _displayUser(id) {
        if (this._displayComponent) this.removeChild(this._displayComponent);
        this._displayComponent = document.createElement('auth-user-info');
        this._displayComponent.setAttribute('userId', id);
        this.appendChild(this._displayComponent);
    }

    createList(users) {
        this.innerHTML = '';
        const list = document.createElement('div');
        list.classList.add('user-list');
        users.forEach(user => {
            const el = document.createElement('div');
            el.setAttribute('id', user.id);
            el.setAttribute('user-list-el', true);
            el.innerText = user.name;
            list.appendChild(el);
        });

        const newRealmBtn = document.createElement('button');
        newRealmBtn.innerText = 'Neues User erstellen';
        newRealmBtn.addEventListener('click', this.createNewUser.bind(this));
        list.appendChild(newRealmBtn);

        const spacer = document.createElement('span');
        spacer.style.flex = '1 1 auto';
        list.appendChild(spacer);

        list.appendChild(document.createElement('auth-logout'));

        this.appendChild(list);
        if (this._displayComponent) this.appendChild(this._displayComponent);
    }

    createNewUser() {
        if (this._displayComponent) this.removeChild(this._displayComponent);
        this._displayComponent = document.createElement('auth-user-create');
        this.appendChild(this._displayComponent);
    }
}

window.customElements.define(UserListComponent.TAG, UserListComponent);

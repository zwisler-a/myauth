import { AuthService } from '../service/auth.service.js';

export class NavigationComponent extends HTMLElement {
    static TAG = 'auth-navigation';
    constructor() {
        super();
    }

    connectedCallback() {
        this.showUsers();
    }

    showRealms() {
        this.innerHTML = `
        <nav>
            <a class="active" onclick="this.parentElement.parentElement.showRealms()">Realms</a>
            <a onclick="this.parentElement.parentElement.showUsers()">Users</a>
            <span style="float:right">${AuthService.getInstance().getName()}</span>
        </nav>
        <main><auth-realm-list></auth-realm-list></main>
        `;
    }

    showUsers() {
        this.innerHTML = `
        <nav>
            <a onclick="this.parentElement.parentElement.showRealms()">Realms</a>
            <a class="active" onclick="this.parentElement.parentElement.showUsers()">Users</a>
            <span style="float:right">${AuthService.getInstance().getName()}</span>
        </nav>
        <main><auth-user-list></auth-user-list></main>
        `;
    }
}

window.customElements.define(NavigationComponent.TAG, NavigationComponent);

import { LOGOUT_URL, REDIRECT_TO } from '../env/env.js';

export class RealmCreateComponent extends HTMLElement {
    static TAG = 'auth-logout';
    constructor() {
        super();
    }

    async connectedCallback() {
        const button = document.createElement('button');
        button.innerText = 'Logout';
        button.style.width = '100%';
        button.addEventListener('click', () => {
            window.location = LOGOUT_URL + '?redirect=' + encodeURIComponent(REDIRECT_TO);
        });
        this.appendChild(button);
    }
}

window.customElements.define(RealmCreateComponent.TAG, RealmCreateComponent);

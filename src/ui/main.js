import { AuthService } from './service/auth.service.js';

(async () => {
    await AuthService.getInstance().checkLogin();
    import('./component/navigation.component.js');
    import('./component/realm-list.component.js');
    import('./component/user-list.component.js');
    import('./component/logout-button.component.js');
})();

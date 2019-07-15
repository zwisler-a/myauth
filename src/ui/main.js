import { AuthService } from './service/auth.service.js';

(async () => {
    await AuthService.getInstance().checkLogin();
    import('./component/realm-list.component.js');
    import('./component/realm-info.component.js');
    import('./component/realm-create.component.js');
    import('./component/realm-properties.component.js');
    import('./component/user-list.component.js');
    import('./component/user-info.component.js');
    import('./component/user-create.component.js');
    import('./component/logout-button.component.js');
})();

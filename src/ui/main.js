import { AuthService } from './service/auth.service.js';

(async () => {
    await AuthService.getInstance().checkLogin();
    import('./component/realm-list.component.js');
    import('./component/realm-info.component.js');
    import('./component/realm-create.component.js');
    import('./component/realm-properties.component.js');
})();

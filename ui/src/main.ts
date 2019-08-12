import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { AuthService } from './services/auth.service';

Vue.config.productionTip = false;

AuthService.checkLogin()
    .then(() => {
        new Vue({
            router,
            render: h => h(App)
        }).$mount('#app');
    })
    .catch(err => {
        return null;
    });

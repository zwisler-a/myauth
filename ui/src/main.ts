import Vue from 'vue';
declare const myauth: { authenticate: () => Promise<any> };
import App from './App.vue';
import router from './router';

Vue.config.productionTip = process.env.NODE_ENV !== 'production';
(async () => {
    await myauth.authenticate();
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
})();

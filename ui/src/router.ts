import Vue from 'vue';
import Router from 'vue-router';
import Realms from './views/Realms.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/realms',
            name: 'Realms',
            component: Realms,
            children: [
                {
                    path: ':id',
                    component: () => import(/* webpackChunkName: "realmdetail" */ './views/Realms/RealmDetail.vue')
                }
            ]
        },
        {
            path: '/users',
            name: 'Users',
            component: () => import(/* webpackChunkName: "about" */ './views/Users.vue'),
            children: [
                {
                    path: ':id',
                    component: () => import(/* webpackChunkName: "realmdetail" */ './views/Users/UserDetail.vue')
                }
            ]
        },
        {
            path: '/logs',
            name: 'Logs',
            component: () => import(/* webpackChunkName: "logs" */ './views/Logs.vue')
        }
    ]
});

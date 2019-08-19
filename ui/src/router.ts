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
                    path: 'create',
                    component: () => import(/* webpackChunkName: "rc" */ './views/Realms/RealmCreateContainer.vue')
                },
                {
                    path: ':id',
                    component: () => import(/* webpackChunkName: "rd" */ './views/Realms/RealmEditContainer.vue')
                }
            ]
        },
        {
            path: '/users',
            name: 'Users',
            component: () => import(/* webpackChunkName: "u" */ './views/Users.vue'),
            children: [
                {
                    path: 'create',
                    component: () => import(/* webpackChunkName: "uc" */ './views/Users/UserCreateContainer.vue')
                },
                {
                    path: ':id',
                    component: () => import(/* webpackChunkName: "ud" */ './views/Users/UserEditContainer.vue')
                }
            ]
        },
        {
            path: '/logs',
            name: 'Logs',
            component: () => import(/* webpackChunkName: "logs" */ './views/Logs.vue')
        },
        { path: '*', redirect: 'realm' }
    ]
});

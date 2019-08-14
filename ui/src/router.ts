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
                    component: () => import(/* webpackChunkName: "realmcreate" */ './views/Realms/RealmCreateContainer.vue')
                },
                {
                    path: ':id',
                    component: () => import(/* webpackChunkName: "realmdetail" */ './views/Realms/RealmEditContainer.vue')
                }
            ]
        },
        {
            path: '/users',
            name: 'Users',
            component: () => import(/* webpackChunkName: "about" */ './views/Users.vue'),
            children: [
                {
                    path: 'create',
                    component: () => import(/* webpackChunkName: "usercreate" */ './views/Users/UserCreate.vue')
                },
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

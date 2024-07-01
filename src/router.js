import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import AppOurDoctors from './pages/AppOurDoctors.vue';
const router = createRouter({   
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/about',
            name: 'about',
            component: AppAbout
        },
        {
            path: '/our-doctors',
            name: 'our-doctors',
            component: AppOurDoctors
        },
    ]
});
export { router };
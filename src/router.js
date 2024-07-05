import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import AppOurDoctors from './pages/AppOurDoctors.vue';
import SingleSpecialisation from './pages/SingleSpecialisation.vue';
import SingleDoctor from './pages/SingleDoctor.vue';
import AppTermsAndConditionsMessages from './pages/AppTermsAndConditionsMessages.vue';
import AppTermsAndConditionsRatings from './pages/AppTermsAndConditionsRatings.vue';
import SearchResults from './pages/SearchResults.vue';

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
        {
            path: '/specialisation/:slug',
            name: 'single-specialisation',
            component: SingleSpecialisation
        },
        {
            path: '/our-doctors/:slug',
            name: 'single-doctor',
            component: SingleDoctor
        },
        {
            path: '/terms-and-conditions-messages',
            name: 'terms-and-conditions-messages',
            component: AppTermsAndConditionsMessages
        },
        {
            path: '/terms-and-conditions-ratings',
            name: 'terms-and-conditions-ratings',
            component: AppTermsAndConditionsRatings
        },
        {
            path: '/search-results',
            name: 'search-results',
            component: SearchResults,
            props: true,
        }
    ]
});
export { router };
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout .vue";
import DashboardPage from '../views/DashboardPage.vue';
import DataReviews from '../views/DataReviews.vue';

const router = createRouter({
    routes: [
        {
            path: '/',
            component: DefaultLayout,
            children: [
              { path: '', name: 'dashboard', component: DashboardPage },
              { path: '/data-reviews', name: 'data-reviews', component: DataReviews },
            ]
        },
    ],
    history: createWebHistory()
})

export default router;
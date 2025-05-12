import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout .vue";
import DashboardPage from '../views/DashboardPage.vue';

const router = createRouter({
    routes: [
        {
            path: '/',
            component: DefaultLayout,
            children: [
              { path: '', name: 'dashboard', component: DashboardPage },
            ]
        },
    ],
    history: createWebHistory()
})

export default router;
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout .vue";
import DashboardPage from '../views/DashboardPage.vue';
import DataReviews from '../views/DataReviews.vue';
import DataPreprocessing from '../views/DataPrerocessing.vue';
import SentimentAnalysis from "../views/SentimentAnalysis.vue";

const router = createRouter({
    routes: [
        {
            path: '/',
            component: DefaultLayout,
            children: [
              { path: '', name: 'dashboard', component: DashboardPage },
              { path: '/data-reviews', name: 'data-reviews', component: DataReviews },
              { path: '/pre-processing/:step', name: 'preprocessing', component: DataPreprocessing },
              { path: '/sentiment-analysis', name: 'sentiment-analysis', component: SentimentAnalysis },
            ]
        },
    ],
    history: createWebHistory()
})

export default router;
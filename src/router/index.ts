import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { HOME, FORECAST } from './route-paths'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: HOME.NAME,
      path: HOME.PATH,
      component: HomeView,
    },
    {
      name: FORECAST.NAME,
      path: FORECAST.PATH,
      component: () => import('../views/ForecastView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: HOME.PATH,
    },
  ],
})

export default router

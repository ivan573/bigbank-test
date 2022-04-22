import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import ShopView from '@/views/ShopView.vue'
import ReputationView from '@/views/ReputationView.vue'

if (process.env.NODE_ENV !== 'test') {
  Vue.use(VueRouter)
}

export const Route = {
  HOME: '/',
  GAME: '/game',
  SHOP: '/shop',
  REPUTATION: '/reputation'
}

export const routes = [
  {
    path: Route.HOME,
    name: 'home',
    component: HomeView
  },
  {
    path: Route.GAME,
    name: 'game',
    component: GameView
  },
  {
    path: Route.SHOP,
    name: 'shop',
    component: ShopView
  },
  {
    path: Route.REPUTATION,
    name: 'repotation',
    component: ReputationView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from '@/const'
import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import ShopView from '@/views/ShopView.vue'
import ReputationView from '@/views/ReputationView.vue'

Vue.use(VueRouter)

const routes = [
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
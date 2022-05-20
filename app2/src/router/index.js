import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Trening from '../views/Trening.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/trening',
    name: 'Trening',
    component: Trening
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

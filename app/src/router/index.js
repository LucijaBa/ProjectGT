import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Trening from '../views/Trening.vue'
import VrsteTreninga from '../views/VrsteTreninga.vue'

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
  }, 
  {
    path: '/vrsteTreninga',
    name: 'VrsteTreninga',
    component: VrsteTreninga
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

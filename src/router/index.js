import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/index'
import Login from '../views/login/index'
import Brand from '../views/brand/index.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Home,
    children:[
      {
        path: 'brand',
        name: 'Brand',
        component: Brand,
      }

    ]
  },{
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

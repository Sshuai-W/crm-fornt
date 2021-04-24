import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/index'
import Login from '../views/login/index'
import Brand from '../views/brand/index.vue'
import Category from '../views/category/index.vue'
import Admin from '../views/admin/index.vue'
import Dept from '../views/dept/index.vue'
import Role from '../views/role/index.vue'
import Menu from "../views/menu/index.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Home,
        children: [
            {
                path: 'brand',
                name: 'Brand',
                component: Brand,
            },
            {
                path: 'category',
                name: 'Category',
                component: Category
            },
            {
                path: 'admin',
                name: 'Admin',
                component: Admin
            },
            {
                path: 'dept',
                name: 'Dept',
                component: Dept
            },
            {
                path: 'role',
                name: 'Role',
                component: Role
            },
            {
                path: 'menu',
                name: 'Menu',
                component: Menu
            }

        ]
    }, {
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

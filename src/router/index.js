import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '../views/public/Home.vue'
import Admin from '../views/admin/Admin.vue'
import Dashboard from '../views/admin/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login.vue')
  },
  {
    path: '/admin',
    //name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Admin,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },

      {
        path: 'users',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/users/List.vue'),
      },
      {
        path: 'cajas/abrir_cerrar',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/cajas/open_close.vue'),
      },
      {
        path: 'sales/sale_register',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/sales/sale_register.vue'),
      },
      {
        path: 'devolution_register',
        name: 'devolution_register',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/devolutions/devolution_register.vue'),
      },
      {
        path: 'sales/manager',
        name: 'sale_manager',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/sales/sales_manager.vue'),
      },
      {
        path: 'sale',
        name: 'sale',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/sales/sale.vue'),
      },
      {
        path: 'clients/:id',
        name: 'client_show',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/clients/show.vue'),
      },
    ],
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next ({
          name: 'Login',
        })
      }
      if (!store.getters['auth/is_empleado']){
        return next ({
          name: 'Home',
        })
      }
      if (!store.getters['sucursal/is_sucursal_selected']){
        return next ({
          name: 'Login'
        })
      } 

      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

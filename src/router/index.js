import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
       visible: false,
       title: 'Home',
       layout:'LayoutGuest'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      visible: false,
      title: 'About',
      layout:'LayoutMembers'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
       visible: false,
       title: 'Login',
       layout:'LayoutGuest'
    }
  },
  {
    path: '/signup',
    name: 'SignUP',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUP.vue'),
    meta: {
       visible: false,
       title: 'SignUP',
       layout:'LayoutGuest'
    }
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import(/* webpackChunkName: "about" */ '../views/Welcome.vue'),
    props: true,
    meta: {
       visible: false,
       title: 'Welcome',
       layout:'LayoutMembers'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

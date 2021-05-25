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
  {
    path: '/post',
    name: 'Post',
    component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue'),
    props: true,
    meta: {
       visible: false,
       title: 'Post',
       layout:'LayoutMembers'
    }
  },
]

// router.afterEach((to) => {
//   if (to.meta && to.meta.title) {
//     document.title = to.meta.title + ' | Any suffix';
//   }
// });

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

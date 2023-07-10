import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterUserView from '../views/RegisterUserView.vue'
import DetailView from '../views/DetailView.vue'
import Home from '../views/HomeView.vue'
import WishListView from '../views/WishListView.vue'
import MainContent from '../views/MainContent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'home',
          name: 'main',
          component: MainContent
        },
        {
          path: 'gamedetail/:id',
          component: DetailView
        },
        {
          path: 'wishlist',
          name: 'wishlist',
          component: WishListView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUserView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && localStorage.access_token) next({ name: 'home' })
  else if (to.name === 'wishlist' && !localStorage.access_token) next({ name: 'home' })
  else next()
})

export default router

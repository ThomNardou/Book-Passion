import { createRouter, createWebHistory } from 'vue-router'
import LobbyView from '@/views/LobbyView.vue'
import OneBookView from '@/views/oneBookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LobbyView
    },
    {
      path: '/book',
      name: 'book',
      component: OneBookView
    }
  ]
})

export default router

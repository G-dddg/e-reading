import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/books' },
    { path: '/login', component: () => import('@/views/login/index.vue') },
    { path: '/books', component: () => import('@/views/books/BookLayout.vue') },
    {
      path: '/book',
      component: () => import('@/views/books/BookDetailLayout.vue')
    }
  ]
})

export default router

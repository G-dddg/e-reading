import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/index.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/books/home',
      children: [
        {
          path: '/books/home',
          component: () => import('@/views/books/BookHome.vue')
        },
        {
          path: '/books/rank',
          component: () => import('@/views/books/BookRank.vue')
        },
        {
          path: '/books',
          component: () => import('@/views/books/shelf/index.vue'),
          redirect: '/books/shelf',
          children: [
            {
              path: 'shelf',
              component: () => import('@/views/books/shelf/BookShelf.vue')
            },
            {
              path: 'history',
              component: () => import('@/views/books/shelf/BookHistory.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/book/:bookId',
      component: () => import('@/views/book-detail/BookDetailLayout.vue')
    },
    {
      path: '/book/:bookId/chapter/:chapterId',
      component: () => import('@/views/chapter/ChapterContent.vue')
    },
    {
      path: '/book/search',
      component: () => import('@/views/search/BookSearch.vue')
    }
  ]
})

export default router

import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

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

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    ElMessage.warning('请先登录')
    console.log(to.fullPath)
    return { path: '/login', query: { backUrl: to.fullPath } }
  }
})

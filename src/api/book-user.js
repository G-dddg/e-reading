import request from '@/utils/request'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
//收藏
export const BUIsStarService = (bookId) =>
  request.get(`/starBooks/user/${userStore.user.userId}/book/${bookId}`)
export const BUToggleStarService = () => (bookId) =>
  request.get('/starBooks/toggle', {
    bookId,
    userId: userStore.user.userId
  })
//阅读记录
export const BUGetRecordService = (bookId) =>
  request.get(`/record/${bookId}/${userStore.user.userId}`)

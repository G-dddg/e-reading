import request from '@/utils/request'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
export const BUIsStarService = (bookId) =>
  request.get(`/starBooks/user/${userStore.user.userId}/book/${bookId}`)
export const BUToggleStarService = () => (bookId) =>
  request.get('/starBooks/toggle', {
    bookId,
    userId: userStore.user.userId
  })

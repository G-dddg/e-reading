import request from '@/utils/request'
import { useUserStore } from '@/stores'
import { getLocalDateTimeString } from '@/utils/format'

const userStore = useUserStore()
//收藏
export const BUIsStarService = (bookId) =>
  request.get(`/starBooks/user/${userStore.user.userId}/book/${bookId}`)
//转换收藏状态
export const BUToggleStarService = (bookId) =>
  request.post('/starBooks/toggle', null, {
    params: { bookId, userId: userStore.user.userId }
  })
//获取收藏列表
export const BUGetStarListService = () =>
  request.get(`/starBooks/user/${userStore.user.userId}`)

//阅读记录
export const BUGetRecordService = (bookId) =>
  request.get(`/record/${bookId}/${userStore.user.userId}`)
//添加阅读记录
export const BUSaveRecordService = (bookId, chapterId) =>
  request.post('/record/save', {
    bookId,
    lastReadPage: +chapterId,
    lastReadTime: getLocalDateTimeString(),
    userId: userStore.user.userId
  })
//获取阅读记录列表
export const BUGetRecordListService = () =>
  request.get(`/record/allRecords/${userStore.user.userId}`)

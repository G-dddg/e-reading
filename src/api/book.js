import request from '@/utils/request'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
//获取书籍列表
export const bookGetListService = (params) =>
  request.get('/book/list', {
    params
  })
//获取书籍分类
export const bookGetBookTypeService = () => request.get('/type/allType')
//根据书籍分类获取书籍列表
export const bookGetListByTypeService = (params) =>
  request.get(`/book/list/${params.typeName}`, { params })
//收藏书籍
export const bookGetStartBooksService = () =>
  request.get(`/starBooks/user/${userStore.user.userId}`)
//排行榜
export const bookGetBookRankService = ({ category, type }) =>
  request.get(`/dashboard/top/${category}/${type}`)
//书籍详情
export const bookGetBookDetailService = (bookId) =>
  request.get(`/book/${bookId}`)
//获取书籍目录
export const bookGetChapterListService = (bookId) =>
  request.get(`/book/${bookId}/toc`)
//获取书籍章节内容
export const bookGetChapterContentService = (params) => {
  const res = request.get(`/chapter/${params.chapterId}`, {
    params
  })
  return res
}

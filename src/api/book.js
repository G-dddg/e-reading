import request from '@/utils/request'

// export const bookGetListService = (params) =>
//   request.get('/book/list', {
//     params
//   })
export const bookGetStartBooksService = (userId) =>
  request.get(`/startBooks/user/${userId}`)
export const bookGetBookDetailService = (bookId) =>
  request.get(`/book/${bookId}`)

//json-server
export const bookGetListService = () => request.get(`/book/list`)
// export const bookGetBookDetailService = (bookId) =>
//   request.get(`/book/${bookId}`)

import request from '@/utils/request'
// export const userLoginService = ({ userName, userPassword }) =>
//   request.post('/user/login', {
//     userName,
//     userPassword
//   })
export const userRegisterService = ({ userName, userPassword, userSex }) =>
  request.post('/user/register', {
    userName,
    userPassword,
    userSex
  })

export const userGetInfoService = () => request.get('/user/info')
export const userLogoutService = () => request.post('/user/logout')
//TODO:json-server
export const userLoginService = ({ userName, userPassword }) =>
  request.get('/user/login', {
    params: {
      userName,
      userPassword
    }
  })

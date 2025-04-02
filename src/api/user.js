import request from '@/utils/request'
export const userLoginService = ({ userName, userPassword }) =>
  request.post('/user/login', {
    userName,
    userPassword
  })
export const userRegisterService = ({ userName, userPassword, userSex }) =>
  request.post('/user/register', {
    userName,
    userPassword,
    userSex
  })
export const userLogoutService = () => request.post('/user/logout')
export const userGetInfoService = () => request.get('/user/info')

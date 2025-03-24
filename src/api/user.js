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

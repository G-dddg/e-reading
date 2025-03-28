import request from '@/utils/request'
// export const userLoginService = ({ userName, userPassword }) =>
//   request.post('/user/login', {
//     userName,
//     userPassword
//   })
// export const userRegisterService = ({ userName, userPassword, userSex }) =>
//   request.post('/user/register', {
//     userName,
//     userPassword,
//     userSex
//   })
// export const userLogoutService = () => request.post('/user/logout')
export const userGetInfoService = () => request.get('/user/info')
//TODO:json-server
export const userLoginService = ({ userName, userPassword }) =>
  request.get('/user/login', {
    params: {
      userName,
      userPassword
    }
  })
export const userRegisterService = ({ userName, userPassword, userSex }) =>
  request.post('/user/register', {
    userName,
    userPassword,
    userSex,
    isVip: '0',
    vipTime: null,
    userCredit: 50.5,
    userRegTime: '2024-01-15T10:00:00',
    status: '1',
    version: 0
  })
export const userLogoutService = () => {}

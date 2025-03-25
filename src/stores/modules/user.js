import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'
export const useUserStore = defineStore(
  'user',
  () => {
    //token
    const token = ref('')
    const setTocken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    //数据
    const userInfo = ref({
      isVip: '',
      status: '',
      userCredit: 0,
      userId: 0,
      userName: '',
      userPassword: '',
      userRegTime: '',
      userSex: '',
      version: 0,
      vipTime: ''
    })
    const getUserInfo = async () => {
      const res = await userGetInfoService()
      userInfo.value = res.data
    }
    const setUserInfo = (newUserInfo) => {
      userInfo.value = newUserInfo
    }
    const removeUserInfo = () => {
      userInfo.value = {
        isVip: '',
        status: '',
        userCredit: 0,
        userId: 0,
        userName: '',
        userPassword: '',
        userRegTime: '',
        userSex: '',
        version: 0,
        vipTime: ''
      }
    }
    return {
      token,
      setTocken,
      removeToken,
      getUserInfo,
      setUserInfo,
      removeUserInfo
    }
  },
  {
    persist: true
  }
)

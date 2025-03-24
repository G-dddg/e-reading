import { defineStore } from 'pinia'
import { ref } from 'vue'

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
      userInfo,
      setUserInfo,
      removeUserInfo
    }
  },
  {
    persist: true
  }
)

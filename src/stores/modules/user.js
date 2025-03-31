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
    const user = ref({
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
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res
    }
    const setUser = (newUserInfo) => {
      user.value = newUserInfo
    }
    const removeUser = () => {
      user.value = {
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
      user,
      getUser,
      setUser,
      removeUser
    }
  },
  {
    persist: true
  }
)

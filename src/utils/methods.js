import { useUserStore } from '@/stores'
import router from '@/router'
import { ElMessageBox } from 'element-plus'

export const confirmTocken = async () => {
  if (!useUserStore.tocken) {
    await ElMessageBox.confirm('您还未登录', '温馨提示', {
      type: 'warning',
      confirmButtonText: '去登录',
      cancelButtonText: '返回'
    })
    router.push('/login')
  }
}

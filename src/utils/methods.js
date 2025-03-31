import router from '@/router'

export const confirmToken = async () => {
  await ElMessageBox.confirm('您还未登录', '温馨提示', {
    type: 'warning',
    confirmButtonText: '去登录',
    cancelButtonText: '取消'
  })
    .then(() => {
      router.replace('/login')
    })
    .catch(() => {})
}

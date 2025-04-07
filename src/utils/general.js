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

export const paramsDefault = {
  page: 0,
  size: 8,
  category: 'collection',
  type: 'total'
}

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
  size: 100,
  category: 'collection',
  type: 'total'
}

//将封面改为Base64格式
export const images = (src) => {
  if (src !== null && src != '') {
    // 确保在没有 'data:image/jpeg;base64,' 前缀的情况下添加它
    const base64Image = `data:image/jpeg;base64,${src}`
    return base64Image
  }

  return '' // 如果没有封面图像，填充空字符串
}

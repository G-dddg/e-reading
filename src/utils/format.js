import { dayjs } from 'element-plus'

export const formatTime = (time) => dayjs(time).format('YYYY年MM月DD日')

// 获取当前时间的 LocalDateTime 格式（yyyy-MM-ddTHH:mm:ss）
export const getLocalDateTimeString = () => {
  const date = new Date()

  // 获取年月日时分秒
  const pad = (n) => n.toString().padStart(2, '0')
  const yyyy = date.getFullYear()
  const MM = pad(date.getMonth() + 1)
  const dd = pad(date.getDate())
  const hh = pad(date.getHours())
  const mm = pad(date.getMinutes())
  const ss = pad(date.getSeconds())
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
}

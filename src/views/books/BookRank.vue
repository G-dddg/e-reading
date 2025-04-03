<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { bookGetBookRankService } from '@/api/book'
import LargeBookItem from './components/LargeBookItem.vue'
import SmallBookItem from './components/SmallBookItem.vue'
import BookType from './components/BookType.vue'

//item类型
const isLargeScreen = ref(window.innerWidth > 768)
const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth > 768
  console.log(window.innerWidth)
  console.log(isLargeScreen)
}
//获取书籍网络请求
const books = ref([])
const categories = [
  { category: 'collection', name: '收藏榜' },
  { category: 'bestseller', name: '畅销榜' }
]
const types = [
  { type: 'total', name: '总榜' },
  { type: 'daily', name: '日榜' },
  { type: 'monthly', name: '月榜' },
  { type: 'weekly', name: '周榜' }
]
//处理选择数量
const number = ref(10)
const handleChange = (value) => {
  params.value.limit = value
  getBookData()
}

const isloading = ref(false)
const paramsDefault = {
  category: 'collection',
  type: 'total',
  limit: number
}
const params = ref({ ...paramsDefault })
//处理选择
const handleSelect = (item) => {
  item.category
    ? (params.value.category = item.category)
    : (params.value.type = item.type)
  getBookData()
}
//获取书籍列表
const getBookData = async () => {
  try {
    const res = await bookGetBookRankService(params.value)
    console.log(res)
    books.value = res
    return true
  } catch (error) {
    console.error('获取书籍失败:', error)
    return false
  }
}
onMounted(() => {
  params.value = { ...paramsDefault }
  getBookData()
  window.addEventListener('resize', updateScreenSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>
<template>
  <el-container v-loading="isloading" :element-loading-text="'加载中...'">
    <el-aside width="200px">
      <!-- 分类组件 -->
      <!-- categories -->
      <BookType
        :array="categories"
        idKey="category"
        nameKey="name"
        default="收藏榜"
        @select="handleSelect"
        title="分类"
      ></BookType>
      <!-- types -->
      <BookType
        :array="types"
        idKey="type"
        nameKey="name"
        default="总榜"
        @select="handleSelect"
      ></BookType>
    </el-aside>
    <!-- 主体 -->
    <el-main>
      <div class="number">
        排行榜前:
        <el-input-number
          v-model="number"
          :min="10"
          :max="100"
          :step="10"
          @change="handleChange"
        >
          <template #suffix>
            <span>名</span>
          </template></el-input-number
        >
      </div>
      <LargeBookItem v-if="isLargeScreen" :books="books || []"></LargeBookItem>
      <SmallBookItem v-else :books="books || []"></SmallBookItem>
    </el-main>
  </el-container>
</template>
<style scoped>
.el-aside {
  display: flex;
  flex-direction: column;
  width: 180px;
  border-right: #dcdfe6 1px solid;
}
.number {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  color: grey;
  gap: 10px;
}
</style>

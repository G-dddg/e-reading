<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  bookGetListService,
  bookGetBookTypeService,
  bookGetListByTypeService
} from '@/api/book'
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
const books = ref()
const bookTypes = ref([])
const isloading = ref(false)
const total = ref(0)
const paramsDefault = {
  page: 0,
  size: 8
}
const params = ref({ ...paramsDefault })
//处理选择分类
const handleSelect = (item) => {
  params.value.typeName = item.bookTypeName
  params.value.page = 0
  getBookData(item)
}
//获取书籍列表
const getBookData = async (type) => {
  try {
    let res
    if (!type || type === '全部') {
      console.log('全部', params.value)
      res = await bookGetListService(params.value)
    } else {
      console.log('type', params.value)
      res = await bookGetListByTypeService(params.value)
    }
    books.value = res
    currentPage.value = res.number + 1
    total.value = res.totalElements || 0
    return true
  } catch (error) {
    console.error('获取书籍失败:', error)
    return false
  }
}
//获取书籍分类
const getBookTypes = async () => {
  try {
    const res = await bookGetBookTypeService()
    bookTypes.value = res
    return true
  } catch (error) {
    console.error('获取分类失败:', error)
    return false
  }
}
//初始化
const getBooks = async () => {
  isloading.value = true
  books.value = {}
  bookTypes.value = []
  try {
    const [bookSuccess, typeSuccess] = await Promise.all([
      getBookData(),
      getBookTypes()
    ])
    if (!bookSuccess || !typeSuccess) {
      ElMessage.error('数据加载不完整，请重试')
    }
  } finally {
    isloading.value = false
  }
}
// 处理分页
const currentPage = ref(1)
const handleCurrentChange = (page) => {
  params.value.page = page - 1
  window.scrollTo({ top: 0, behavior: 'smooth' }) // 回到顶部
  getBooks()
}
onMounted(() => {
  params.value = { ...paramsDefault }
  getBooks()
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
      <BookType
        :array="bookTypes"
        idKey="bookTypeId"
        nameKey="bookTypeName"
        @select="handleSelect"
      ></BookType>
    </el-aside>
    <!-- 主体 -->
    <el-main>
      <LargeBookItem
        v-if="isLargeScreen"
        :books="books?.content || []"
      ></LargeBookItem>
      <SmallBookItem v-else :books="books?.content || []"></SmallBookItem>
      <!-- 分页 -->
      <div style="display: flex; justify-content: center">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="params.size"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
        />
      </div>
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
</style>

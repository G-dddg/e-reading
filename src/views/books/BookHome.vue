<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { bookGetListService, bookGetBookTypeService } from '@/api/book'
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
const getBooks = async () => {
  isloading.value = true
  books.value = {}
  bookTypes.value = []
  const book = await bookGetListService(params.value)
  const type = await bookGetBookTypeService()
  bookTypes.value = type
  console.log(book)
  currentPage.value = book.number + 1
  books.value = book
  total.value = book.totalElements || 0
  isloading.value = false
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
      <BookType :bookTypes="bookTypes"></BookType>
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

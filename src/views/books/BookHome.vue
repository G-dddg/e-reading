<script setup>
import { ref, onMounted } from 'vue'
import {
  bookGetListService,
  bookGetBookTypeService,
  bookGetListByTypeService
} from '@/api/book'
import LargeBookItem from '@/components/book/LargeBookItem.vue'
import SmallBookItem from '@/components/book/SmallBookItem.vue'
import BookType from './components/BookType.vue'
import { paramsDefault } from '@/utils/general'
defineProps({
  isLargeScreen: {
    type: Boolean
  }
})
//获取书籍网络请求
const books = ref()
const bookTypes = ref([])
const isloading = ref(false)
const total = ref(0)

const params = ref({ ...paramsDefault })
//处理选择分类
const handleSelect = (item) => {
  params.value.typeName = item.bookTypeName
  params.value.page = 0
  getBookData()
}
//获取书籍列表
const getBookData = async () => {
  try {
    let res
    if (!params.value.typeName || params.value.typeName === '全部') {
      res = await bookGetListService(params.value)
    } else {
      res = await bookGetListByTypeService(params.value)
    }
    console.log(res)
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
})
</script>
<template>
  <el-container v-loading="isloading" :element-loading-text="'加载中...'">
    <el-aside>
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

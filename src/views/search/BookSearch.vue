<script setup>
import SmallBookItem from '@/components/SmallBookItem.vue'
import { bookGetListService } from '@/api/book'
import { paramsDefault } from '@/utils/general'
import { ref, onMounted, watch } from 'vue'
import MenuHeader from '@/components/MenuHeader.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const params = ref({
  ...paramsDefault
})
// 处理分页
const total = ref(0)
const currentPage = ref(1)
const handleCurrentChange = (page) => {
  params.value.page = page - 1
  window.scrollTo({ top: 0, behavior: 'smooth' }) // 回到顶部
  getBookList()
}
//搜索值为空
const isEmpty = ref(false)
//获取书籍列表
const search = ref('')
const books = ref([])
const getBookList = async () => {
  loading.value = true
  params.value.keyword = search.value
  books.value = []
  const res = await bookGetListService(params.value)
  books.value = res.content
  total.value = res.totalElements || 0
  if (books.value.length === 0) {
    isEmpty.value = true
  } else {
    isEmpty.value = false
  }
  loading.value = false
}
//加载
const loading = ref(false)
onMounted(() => {
  search.value = route.query.keyword ? route.query.keyword : ''
  getBookList()
})
watch(() => route.query.keyword, getBookList)
</script>
<template>
  <MenuHeader v-model="search"></MenuHeader>
  <div class="container">
    <div v-if="!isEmpty" v-loading="loading" class="items">
      <SmallBookItem :books="books"></SmallBookItem>
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
    </div>
    <div v-else class="empty-container">
      <el-empty description="没有搜索到这本书，换一本试试吧"></el-empty>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  height: 100%;
}
.items {
  width: 65%;
}
</style>

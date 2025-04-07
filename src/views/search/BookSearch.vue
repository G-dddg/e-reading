<script setup>
import SmallBookItem from '@/components/SmallBookItem.vue'
import { bookGetListService } from '@/api/book'
import { paramsDefault } from '@/utils/general'
import { ref, onMounted } from 'vue'
import MenuHeader from '@/components/MenuHeader.vue'
const props = defineProps({
  keyword: {
    type: String
  }
})
const params = ref({
  ...paramsDefault
})
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
  if (books.value.length === 0) {
    isEmpty.value = true
  } else {
    isEmpty.value = false
  }
  loading.value = false
}
//监听搜索框的值
const handleSearch = () => {
  getBookList()
}
//加载
const loading = ref(false)
onMounted(() => {
  search.value = props.keyword
  getBookList()
})
</script>
<template>
  <MenuHeader v-model="search" @UpdateBookList="handleSearch"></MenuHeader>
  <div class="container">
    <SmallBookItem
      v-if="!isEmpty"
      v-loading="loading"
      :books="books"
    ></SmallBookItem>
    <div v-else class="empty-container">
      <el-empty description="暂无数据"></el-empty>
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
  width: 80%;
  height: 100%;
}
</style>

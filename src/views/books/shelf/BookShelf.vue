<script setup>
import LargeBookItem from '@/components/book/LargeBookItem.vue'
import { ref, onMounted } from 'vue'
import { BUGetStarListService, BUToggleStarService } from '@/api/book-user'

const books = ref([])
//获取书籍列表
const getBookList = async () => {
  books.value = await BUGetStarListService()
}
//取消收藏
const handleStar = async (bookId) => {
  await ElMessageBox.confirm('是否取消收藏？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await BUToggleStarService(bookId)
      if (res) {
        books.value = books.value.filter((item) => item.bookId !== bookId)
      }
    })
    .catch(() => {})
}
onMounted(() => {
  getBookList()
})
</script>
<template>
  <LargeBookItem :books="books || []" :showStar="true" @cancelStar="handleStar">
  </LargeBookItem>
</template>
<style scoped lang="scss">
.container {
  width: 100%;
  box-sizing: border-box;
}
</style>

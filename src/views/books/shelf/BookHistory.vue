<script setup>
import LargeBookItem from '@/components/LargeBookItem.vue'
import { ref, onMounted } from 'vue'
import { BUGetRecordListService } from '@/api/book-user'

const books = ref([])
//获取书籍列表
const getBookList = async () => {
  books.value = await BUGetRecordListService()
}
onMounted(() => {
  getBookList()
})
</script>
<template>
  <LargeBookItem :books="books || []"> </LargeBookItem>
</template>
<style scoped lang="scss">
.container {
  width: 100%;
  box-sizing: border-box;
}
</style>

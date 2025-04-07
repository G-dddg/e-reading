<script setup>
import { ref, computed } from 'vue'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useReaderStore } from '@/stores'

const props = defineProps({
  chapters: {
    type: Array,
    required: true,
    default: () => []
  },
  bookId: {
    type: String,
    required: true
  }
})
const sort = ref(true) // true: 升序, false: 降序
const router = useRouter()
//排序后的数据副本
const sortedChapters = computed(() => {
  return [...props.chapters].sort((a, b) => {
    return sort.value ? a.chapterId - b.chapterId : b.chapterId - a.chapterId
  })
})
const indexMethod = (index) => {
  return sort.value ? index + 1 : sortedChapters.value.length - index - 1
}
//处理章节点击事件
const readerStore = useReaderStore()
const handleCurrentChange = (row) => {
  if (!readerStore.getTOC(props.bookId)) {
    readerStore.setTOC(props.bookId, props.chapters)
  }
  router.push(`/book/${props.bookId}/chapter/${row.chapterId}`)
}
</script>

<template>
  <el-table
    :data="sortedChapters"
    height="90vh"
    highlight-current-row
    @current-change="handleCurrentChange"
  >
    <el-table-column
      fixed
      align="center"
      width="100"
      type="index"
      :index="indexMethod"
    >
      <template #header>
        <el-button @click="sort = !sort">
          {{ sort ? '升序' : '降序' }}
          <el-icon v-if="sort"><ArrowUp /></el-icon>
          <el-icon v-else><ArrowDown /></el-icon>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column prop="chapterName" label="章节名称"></el-table-column>
  </el-table>
</template>

<style scoped></style>

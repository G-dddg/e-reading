<script setup>
import { ref, computed, nextTick } from 'vue'
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
    type: [Number, String],
    required: true
  },
  currentChapter: {
    type: Object,
    required: false
  }
})
//转至当前章节
const tableRef = ref(null)
const scrollToCurrentRow = async () => {
  if (props.currentChapter && props.chapters.length > 0) {
    await nextTick()
    const index = sortedChapters.value.findIndex(
      (item) => item.chapterId === props.currentChapter.chapterId
    )
    if (index !== -1 && tableRef.value) {
      tableRef.value.setCurrentRow(props.currentChapter)
      nextTick(() => {
        const wrapper = tableRef.value?.$el?.querySelector(
          '.el-scrollbar__wrap'
        )
        const firstRow = tableRef.value?.$el?.querySelector('.el-table__row')
        const rowHeight = firstRow.offsetHeight
        if (wrapper) {
          wrapper.scrollTop = index * rowHeight
        }
      })
    }
  }
}

//排序
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

defineExpose({ scrollToCurrentRow })
</script>

<template>
  <el-table
    :data="sortedChapters"
    height="80vh"
    ref="tableRef"
    highlight-current-row
    row-key="chapterId"
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
    <el-table-column
      prop="chapterName"
      label="章节名称"
      show-overflow-tooltip
    ></el-table-column>
  </el-table>
</template>
<style scoped></style>

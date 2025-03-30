<script setup>
import { ref, onMounted } from 'vue'
import MenuHeader from '@/components/MenuHeader.vue'

const menu = ref(null)

// 书籍信息（静态示例数据）
const book = ref()
//章节列表
const chapters = ref([])
// 组件加载时打开菜单

defineProps({
  bookId: {
    type: String,
    required: true
  }
})
onMounted(() => {
  menu.value.open('bookDetail')
})
</script>
<template>
  <!-- 头部菜单 -->
  <MenuHeader ref="menu"></MenuHeader>
  <!-- 主体内容 -->
  <el-backtop :right="100" :bottom="100" />
  <el-container class="book-detail">
    <el-main>
      <!-- 第一行：书籍封面 + 书籍信息 -->
      <el-card>
        <div class="book-header">
          <div class="book-cover">
            <el-image :src="book.bookCover" fit="cover" />
          </div>
          <div class="book-info">
            <h2>{{ book.title }}</h2>
            <p>作者：{{ book.author }}</p>
            <el-tag type="success">{{ book.priceType }}</el-tag>
            <el-tag type="info">{{ book.genre }}</el-tag>
            <p>创建时间：{{ book.createTime }}</p>
            <p>更新时间：{{ book.updateTime }}</p>
            <p>总页数：{{ book.pageCount }}</p>
            <div class="book-actions">
              <el-button type="primary">开始阅读</el-button>
              <el-button type="warning">加入书架</el-button>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 第二行：书籍简介 -->
      <el-card class="book-summary">
        <el-collapse>
          <el-collapse-item title="书籍简介">
            <p>{{ book.summary }}</p>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <!-- 第三行：书籍目录 -->
      <el-card class="book-chapters">
        <template #header>
          <h3>书籍目录</h3>
          <div>{{ chapters }}</div>
        </template>
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.book-detail {
  width: 90%;
  margin: 0 auto;

  .book-header {
    display: flex;
  }

  .book-cover {
    width: 150px;
    height: 200px;
    margin: auto 20px;
  }
}
</style>

<template>
  <el-card
    shadow="hover"
    class="book-card"
    v-for="item in books"
    :key="item.title"
  >
    <div class="book-content">
      <el-image class="book-cover" :src="item.cover" fit="cover" />
      <div class="book-info">
        <h3 class="book-title">{{ item.title }}</h3>
        <p class="book-author">{{ item.author }}</p>
        <p class="book-description">{{ item.description }}</p>
        <div class="book-footer">
          <el-tag type="success" class="book-tag">{{ item.priceType }}</el-tag>
          <el-tag class="book-category">{{ item.category }}</el-tag>
          <el-button type="primary">开始阅读</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
// 书籍列表
defineProps({
  books: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
/* 书籍卡片：横向排列 */
.book-card {
  align-items: center;
  padding: 16px;
  border-radius: 10px;
  text-align: left;
  margin-bottom: 20px;
  .book-content {
    display: flex;
    align-items: center;
  }
}

/* 书籍封面：独占左侧 */
.book-cover {
  width: 120px;
  height: 160px;
  border-radius: 6px;
  flex-shrink: 0;
}

/* 书籍信息：右侧排列 */
.book-info {
  flex-grow: 1;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 书名 */
.book-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

/* 作者 */
.book-author {
  font-size: 14px;
  color: gray;
  margin-bottom: 6px;
}

/* 作品简介：两行溢出显示省略号 */
.book-description {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  max-height: 2.8em; /* 2行文本高度 */
  -webkit-line-clamp: 2; /* 限制行数 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
  display: -webkit-box;
}

/* 标签容器 */
.book-footer {
  display: flex;
  gap: 5px;
  margin-top: auto;
  align-items: center;
  button {
    margin-left: auto;
  }
}

/* 分类标签 */
.el-tag {
  font-size: 12px;
}
</style>

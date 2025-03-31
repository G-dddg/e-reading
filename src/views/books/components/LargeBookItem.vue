<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps({
  books: {
    type: Array,
    required: true
  }
})
const handleClick = (bookId) => {
  console.log(bookId)
  router.push(`/book/${bookId}`)
}
</script>
<template>
  <el-row :gutter="20" class="book-container">
    <el-col
      v-for="item in books"
      :key="item.bookId"
      :sm="12"
      :md="12"
      :lg="6"
      class="book-col"
    >
      <el-card
        shadow="hover"
        class="book-card"
        @click="handleClick(item.bookId)"
      >
        <el-image class="book-cover" :src="item.bookCover" fit="cover" />
        <div class="book-info">
          <h3 class="book-title">{{ item.bookName }}</h3>
          <p class="book-author">{{ item.author }}</p>
          <div class="book-tags">
            <el-tag type="success" class="book-tag">{{ item.isCharge }}</el-tag>
            <el-tag class="book-category">{{
              item.bookType.bookTypeName
            }}</el-tag>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
/* 书籍卡片样式 */
.book-card {
  text-align: center;
  border-radius: 10px;
  margin-bottom: 20px;
}

/* 书籍封面 */
.book-cover {
  width: 100px;
  height: 150px;
  margin: 0 auto;
  display: block;
  border-radius: 6px;
}

/* 书籍信息 */
.book-info {
  margin-top: 10px;
}

/* 书名 */
.book-title {
  font-size: 16px;
  font-weight: bold;
}

/* 作者 */
.book-author {
  font-size: 14px;
  color: gray;
}

/* 标签容器 */
.book-tags {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  gap: 5px;
}

/* 价格类型标签 */
.book-tag {
  font-size: 12px;
}

/* 书籍分类标签 */
.book-category {
  font-size: 12px;
}
</style>

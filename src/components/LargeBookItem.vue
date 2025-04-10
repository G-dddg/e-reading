<script setup>
import { useRouter } from 'vue-router'
import { MoreFilled } from '@element-plus/icons-vue'

const router = useRouter()
defineProps({
  books: {
    type: Array,
    required: true
  },
  showStar: {
    type: Boolean,
    default: false
  }
})
// 取消收藏
const emit = defineEmits(['cancelStar'])
const handleStar = (bookId) => {
  emit('cancelStar', bookId)
}

const handleClick = (bookId) => {
  const url = router.resolve(`/book/${bookId}`).href
  window.open(url, '_blank')
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
        <div class="header">
          <el-image class="book-cover" :src="item.bookCover" fit="cover" />
          <el-dropdown v-if="showStar" trigger="click" class="dropdown-icon">
            <span @click.stop>
              <el-icon size="20"><MoreFilled /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  :icon="Plus"
                  @click.stop="handleStar(item.bookId)"
                >
                  取消收藏
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="book-info">
          <h3 class="book-title format">{{ item.bookName }}</h3>
          <p class="book-author format">{{ item.author }}</p>
          <div class="book-tags">
            <el-tag
              v-if="item.isCharge !== null"
              :type="item.isCharge === 1 ? 'danger' : 'success'"
              class="book-tag"
              >{{ item.isCharge === 1 ? '收费' : '免费' }}</el-tag
            >
            <el-tag class="book-category" v-if="!!item.bookType">{{
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 150px;
  margin: 0 auto;
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
/* 一行 */
.format {
  -webkit-line-clamp: 1; /* 限制行数 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
  display: -webkit-box;
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
.header {
  position: relative;
  height: 150px;
}

.dropdown-icon {
  position: absolute;
  left: 50%;
  transform: translateX(56px);
  cursor: pointer;
}
</style>

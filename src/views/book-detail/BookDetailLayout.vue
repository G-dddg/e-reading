<script setup>
import { ref, onMounted } from 'vue'
import MenuHeader from '@/components/MenuHeader.vue'
import { useRoute } from 'vue-router'
import { bookGetBookDetailService, bookGetChapterListService } from '@/api/book'
import { BUIsStarService, BUToggleStarService } from '@/api/book-user'
import { formatTime } from '@/utils/format'
import ChaptersList from '@/components/ChaptersList.vue'
import { Check } from '@element-plus/icons-vue'
// 获取路由参数
const route = useRoute()
// 书籍信息（静态示例数据）
const bookId = route.params.bookId
const book = ref({})
//用户是否收藏
const isStar = ref(false)
const getIsStar = async () => {
  const res = await BUIsStarService(bookId)
  console.log(res)
  isStar.value = res
}
//改变书籍收藏状态
const changeStar = async () => {
  const res = await BUToggleStarService(bookId)
  console.log(res)
  isStar.value = !isStar.value
}
//章节列表
const chapters = ref([])
const getChapters = async () => {
  const res = await bookGetChapterListService(bookId)
  console.log(res)
  chapters.value = res
}
// 菜单
const menu = ref(null)
// 获取书籍信息
const getBookDetail = async () => {
  const res = await bookGetBookDetailService(bookId)
  console.log(res)
  book.value = res
}
onMounted(() => {
  //菜单栏的显示
  menu.value.open('bookDetail')
  console.log(bookId)
  getBookDetail()
  getChapters()
  getIsStar()
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
        <template #header>
          <h3>书籍详情</h3>
        </template>
        <div class="book-header">
          <div class="book-cover">
            <el-image :src="book.bookCover" fit="cover" />
          </div>
          <div class="book-info">
            <h2>{{ book.bookName }}</h2>
            <p>作者：{{ book.author }}</p>
            <div class="book-tag">
              <el-tag v-if="!!book.bookType">{{
                book.bookType.bookTypeName
              }}</el-tag>
              <el-tag :type="book.isCharge === 1 ? 'danger' : 'success'">{{
                book.isCharge === 1 ? '收费' : '免费'
              }}</el-tag>
            </div>
            <div class="book-time">
              <p v-if="!!book.createTime">
                创建时间：{{ formatTime(book.createTime) }}
              </p>
              <p v-if="!!book.updateTime">
                更新时间：{{ formatTime(book.updateTime) }}
              </p>
            </div>
            <p>总页数：{{ book.bookPage }}</p>
            <div class="book-actions">
              <el-button type="primary">开始阅读</el-button>
              <el-button @click="changeStar">
                <el-icon v-if="isStar"><Check /></el-icon
                >{{ isStar ? '已收藏' : '加入书架' }}
              </el-button>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 第二行：书籍简介 -->
      <el-card class="book-bookDesc">
        <template #header>
          <h3>简介</h3>
        </template>
        <p>{{ book.bookDesc }}</p>
      </el-card>

      <!-- 第三行：书籍目录组件 -->
      <el-card class="book-chapters">
        <template #header>
          <h3>目录</h3>
        </template>
        <ChaptersList :chapters="chapters"></ChaptersList>
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.book-detail {
  width: 75%;
  margin: 0 auto;
  .el-card {
    margin: 0 0 30px;
    border-radius: 15px;
  }
  .book-header {
    display: flex;
    justify-content: space-evenly;
    .book-cover {
      width: 150px;
      height: 200px;
      margin: auto 20px;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
    .book-info {
      padding-bottom: 25px;
      .book-tag {
        display: flex;
        gap: 10px;
      }
      .book-time {
        font-size: small;
        color: grey;
      }
      .book-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
    }
  }
}
</style>

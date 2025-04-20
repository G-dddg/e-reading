<script setup>
import { ref, onMounted } from 'vue'
import MenuHeader from '@/components/menu/MenuHeader.vue'
import { useRoute } from 'vue-router'
import { bookGetBookDetailService, bookGetChapterListService } from '@/api/book'
import {
  BUIsStarService,
  BUToggleStarService,
  BUGetRecordService
} from '@/api/book-user'
import { formatTime } from '@/utils/format'
import ChaptersList from '@/components/ChaptersList.vue'
import { CircleCheck } from '@element-plus/icons-vue'
import { useReaderStore } from '@/stores'
import router from '@/router'
import CoverImage from '@/components/book/CoverImage.vue'

onMounted(async () => {
  isLoading.value = true
  //菜单栏的显示
  Promise.allSettled([
    getBookDetail(),
    getChapters(),
    getIsStar(),
    getReadRecord()
  ])
    .catch((error) => {
      console.error('加载书籍详情失败:', error)
    })
    .finally(() => {
      isLoading.value = false
    })
})
// 获取路由参数
const route = useRoute()
// 书籍信息（静态示例数据）
const bookId = route.params.bookId
const book = ref({})
//加载状态
const isLoading = ref(false)
//用户是否收藏
const isStar = ref(false)
const getIsStar = async () => {
  isStar.value = await BUIsStarService(bookId)
}
//改变书籍收藏状态
const changeStar = async () => {
  BUToggleStarService(bookId)
  isStar.value = !isStar.value
}
//章节列表
const chapters = ref([])
const getChapters = async () => {
  try {
    const cached = readerStore.getTOC(bookId) || []
    if (cached.length > 0) {
      chapters.value = cached
    } else {
      const res = await bookGetChapterListService(bookId)
      chapters.value = res
      readerStore.setTOC(bookId, chapters.value)
    }
  } catch (error) {
    console.error('加载章节失败:', error)
    chapters.value = [] // 容错处理
  }
}

// 获取书籍信息
const getBookDetail = async () => {
  const res = await bookGetBookDetailService(bookId)
  book.value = res
}
//获取用户阅读记录
const readerStore = useReaderStore()
const readed = ref({})
const isReaded = ref(false)
const getReadRecord = async () => {
  //获取用户阅读记录
  readed.value = readerStore.getProgress(bookId)
  console.log(readed.value)
  if (readed.value === null) {
    const res = await BUGetRecordService(bookId)
    console.log(res)
    if (res.chapterId !== null) {
      readed.value = res.lastReadPage
    }
  }
  console.log(readed.value)
  if (readed.value !== null) {
    isReaded.value = true
  } else {
    isReaded.value = false
  }
}
//点击开始阅读/继续阅读
const handleRead = () => {
  if (chapters.value.length === 0) {
    ElMessage.warning('暂无章节，请稍后再试')
  } else if (isReaded.value) {
    router.push(`/book/${bookId}/chapter/${readed.value}`)
  } else {
    router.push(`/book/${bookId}/chapter/${chapters.value[0].chapterId}`)
  }
}
</script>
<template>
  <!-- 头部菜单 -->
  <MenuHeader></MenuHeader>
  <!-- 主体内容 -->
  <el-backtop :right="100" :bottom="100" />
  <el-container class="book-detail" v-loading="isLoading">
    <el-main>
      <!-- 第一行：书籍封面 + 书籍信息 -->
      <el-card>
        <template #header>
          <h3>书籍详情</h3>
        </template>
        <div class="book-header">
          <div class="book-cover">
            <CoverImage :src="book.bookCover" :lazy="false"></CoverImage>
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
              <el-button type="primary" @click="handleRead">
                <span v-if="!isReaded">开始阅读</span>
                <span v-else>继续阅读</span></el-button
              >
              <el-button @click="changeStar">
                <el-icon v-if="isStar"><CircleCheck /></el-icon
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
        <ChaptersList :chapters="chapters" :book-id="bookId"></ChaptersList>
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
        gap: 10px;
        margin-top: 20px;
      }
    }
  }
  .book-bookDesc {
    p {
      text-indent: 2em;
    }
  }
}
</style>

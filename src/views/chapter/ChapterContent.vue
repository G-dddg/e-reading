<script setup>
import MenuHeader from '@/components/menu/MenuHeader.vue'
import { bookGetChapterContentService } from '@/api/book'
import { BUSaveRecordService } from '@/api/book-user.js'
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useReaderStore } from '@/stores'
import { bookGetChapterListService } from '@/api/book'
import { ElMessage } from 'element-plus'
import router from '@/router'
import ChaptersList from '@/components/ChaptersList.vue'
import ToolMenu from './components/ToolMenu.vue'
//获取路由参数
const route = useRoute()
const readerStore = useReaderStore()

//保存进度
const saveProgress = async () => {
  //本地保存
  readerStore.setProgress(bookId, chapterId.value)
  //上传云端
  await BUSaveRecordService(bookId, chapterId.value)
}
//加载
const loading = ref(false)
//处理键盘事件
const keyboardEvent = (e) => {
  if (loading.value) return
  if (e.key === 'ArrowLeft') {
    handleClick('pre')
  } else if (e.key === 'ArrowRight') {
    handleClick('next')
  }
}
const chapterId = ref(+route.params.chapterId)
//章节变化时重新加载内容
watch(
  () => route.params.chapterId,
  async () => {
    chapterId.value = +route.params.chapterId
    getCurrentChapter()
    await getContent()
    nextTick(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
  }
)
//初始化
const init = async () => {
  loading.value = true
  await Promise.allSettled([getChapters(), getContent()]).finally(() => {
    loading.value = false
  })
}
//获取书籍目录和当前章节名
const chapters = ref([])
const currentChapter = ref({})
const currentChapterIndex = ref(0)
const getChapters = async () => {
  chapters.value = await readerStore.getTOC(bookId)
  if (chapters.value === null) {
    chapters.value = await bookGetChapterListService(bookId)
    readerStore.setTOC(bookId, chapters.value)
  }
  getCurrentChapter()
}
const getCurrentChapter = () => {
  currentChapter.value = chapters.value.find(
    (item) => item.chapterId === chapterId.value
  )
  currentChapterIndex.value = chapters.value.indexOf(currentChapter.value)
}
//获取章节内容
const bookId = +route.params.bookId
const content = ref('')
//从服务器获取章节内容
const fetchContent = async (Id) => {
  return await bookGetChapterContentService(Id)
}
//获取当前章节内容，首先考虑从缓存中获取
const getContent = async () => {
  loading.value = true
  let res = await readerStore.getChapter(bookId, chapterId.value)
  if (!res) {
    res = await fetchContent(chapterId.value)
    await readerStore.cacheChapter(bookId, chapterId.value, content.value)
  }
  content.value = res

  //缓存下一章内容
  const nextChapterIndex = currentChapterIndex.value + 1
  const nextChapter = chapters.value[nextChapterIndex]
  if (nextChapter) {
    const nextChapterId = nextChapter.chapterId
    const nextContent = await readerStore.getChapter(bookId, nextChapterId)
    if (!nextContent) {
      const next = await fetchContent(nextChapterId)
      await readerStore.cacheChapter(bookId, nextChapterId, next)
    }
  }
  loading.value = false
}

//处理段落格式
const formatContent = computed(() => {
  return content.value
    ? content.value.split('\n').filter((item) => item.trim() !== '')
    : []
})
//处理按钮
const handleClick = (target) => {
  let nextChapterId = 0
  if (target === 'pre') {
    if (currentChapterIndex.value === 0) {
      ElMessage.warning('已经是第一章')
      return
    }
    nextChapterId = chapters.value[currentChapterIndex.value - 1].chapterId
  } else if (target === 'next') {
    if (currentChapterIndex.value === chapters.value.length - 1) {
      ElMessage.warning('已经是最后一章')
      return
    }
    nextChapterId = chapters.value[currentChapterIndex.value + 1].chapterId
  }
  router.replace(`/book/${bookId}/chapter/${nextChapterId}`)
}
//处理抽屉目录
const toc = ref(false)
const handleToc = () => {
  toc.value = !toc.value
}
const chaptersListRef = ref(null)
const drawerOpen = () => {
  chaptersListRef.value?.scrollToCurrentRow()
}
onMounted(() => {
  init()
  addEventListener('keyup', keyboardEvent)
})
onBeforeUnmount(() => {
  //移除事件监听器
  removeEventListener('keyup', keyboardEvent)
  //保存进度
  window.removeEventListener('beforeunload', saveProgress)
  saveProgress()
})
</script>
<template>
  <MenuHeader></MenuHeader>
  <div class="container" v-loading="loading">
    <div class="contentContainer">
      <div class="toolContainer">
        <ToolMenu class="tool-menu" @showChapters="handleToc"></ToolMenu>
      </div>
      <div class="title">
        <strong>{{ currentChapter.chapterName }}</strong>
      </div>
      <div class="content" v-for="(item, index) in formatContent" :key="index">
        {{ item }}
      </div>
      <!-- 按钮 -->
      <div class="buttonContainer">
        <button class="preButton toolbutton" @click="handleClick('pre')">
          上一章
        </button>
        <div class="divider"></div>
        <button class="toolbutton" @click="handleToc">目录</button>
        <div class="divider"></div>
        <button class="nextButton toolbutton" @click="handleClick('next')">
          下一章
        </button>
      </div>
    </div>
    <!-- 抽屉目录 -->
    <el-drawer
      v-model="toc"
      size="360px"
      title="目录"
      direction="rtl"
      @open="drawerOpen"
    >
      <ChaptersList
        ref="chaptersListRef"
        :chapters="chapters"
        :book-id="bookId"
        :currentChapter="currentChapter"
        :visible="toc"
      ></ChaptersList>
    </el-drawer>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 0;
}
.toolContainer {
  position: absolute;
  right: -15px;
}
.tool-menu {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
}
.contentContainer {
  position: relative;
  width: 55%;
  min-width: 700px;
  margin: 0 auto;
  padding: 20px 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.content {
  font-size: larger;
  text-indent: 2em;
  margin-bottom: 1em;
  width: 100%;
  text-align: justify;
  line-height: 1.8em;
}
.title {
  font-size: 1.5em;
  display: flex;
  margin-bottom: 15px;
  justify-content: center;
}
.buttonContainer {
  background: #ebebeb;
  width: 350px;
  height: 50px;
  display: flex;
  margin: 50px auto 70px;
  border-radius: 30px;
  align-items: center;
}
.divider {
  width: 1px;
  height: 80%;
  background: #d5d5d5;
}
.preButton {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.nextButton {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.toolbutton {
  height: 100%;
  background: #ebebeb;
  border: none;
  flex: 1;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
    color: #505050;
  }
  &:active {
    background: #dddddd;
  }
}
</style>

<script setup>
import MenuHeader from '@/components/MenuHeader.vue'
import { bookGetChapterContentService } from '@/api/book'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useReaderStore } from '@/stores'
import { bookGetChapterListService } from '@/api/book'
//获取路由参数
const route = useRoute()
const readerStore = useReaderStore()
//获取章节内容
const bookId = +route.params.bookId
const chapterId = +route.params.chapterId
const content = ref()
//从服务器获取章节内容
const fetchContent = async (bookId, chapterId) => {
  const res = await bookGetChapterContentService({ bookId, chapterId })
  content.value = res
}
//获取当前章节内容，首先考虑从缓存中获取
const getContent = async () => {
  const res = await readerStore.getChapter(bookId, chapterId)
  if (!res) {
    await fetchContent(bookId, chapterId)
    await readerStore.cacheChapter(bookId, chapterId, content.value)
  } else {
    content.value = res
  }
  //缓存下一章内容
  const nextChapterIndex = currentChapterIndex.value + 1
  const nextChapter = chapters.value[nextChapterIndex]
  if (nextChapter) {
    const nextChapterId = nextChapter.chapterId
    const nextContent = await readerStore.getChapter(bookId, nextChapterId)
    if (!nextContent) {
      const next = await fetchContent(bookId, nextChapterId)
      await readerStore.cacheChapter(bookId, nextChapterId, next)
    }
  }
}
//获取书籍目录和当前章节名
const chapters = ref([])
const currentChapterName = ref('')
const currentChapterIndex = ref(0)
const getChapters = async () => {
  chapters.value = await readerStore.getTOC(bookId)
  if (chapters.value === null) {
    chapters.value = await bookGetChapterListService(bookId)
    readerStore.setTOC(bookId, chapters.value)
  }
  console.log('zz章节', chapters.value)
  const currentChapter = chapters.value.find(
    (item) => item.chapterId === chapterId
  )
  currentChapterName.value = currentChapter.chapterName
  currentChapterIndex.value = chapters.value.indexOf(currentChapter)
  console.log('当前章节', currentChapter.value)
}
//处理段落格式
const formatContent = computed(() =>
  content.value
    ? content.value.split('\n').filter((item) => item.trim() !== '')
    : []
)
onMounted(async () => {
  await getChapters()
  await getContent()
})
</script>
<template>
  <MenuHeader></MenuHeader>
  <div class="container">
    <div class="contentContainer">
      <div class="title">
        <strong>{{ currentChapterName }}</strong>
      </div>
      <div class="content" v-for="(item, index) in formatContent" :key="index">
        {{ item }}
      </div>
      <!-- 按钮 -->
      <div class="buttonContainer">
        <button class="preButton toolbutton" @click="handlePre">上一章</button>
        <div class="divider"></div>
        <button class="toolbutton" @click="toc">目录</button>
        <div class="divider"></div>
        <button class="nextButton toolbutton" @click="handleNext">
          下一章
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 784px;
  padding: 30px 0;
}
.contentContainer {
  width: 65%;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.content {
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
  margin: 0 auto;
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

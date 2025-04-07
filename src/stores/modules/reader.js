// src/stores/readerStore.js
import { defineStore } from 'pinia'
import { openDB } from 'idb'
import { ref } from 'vue'

const dbPromise = openDB('reader-db', 1, {
  upgrade(db) {
    db.createObjectStore('chapters')
  }
})

const getChapterKey = (bookId, chapterId) => `${bookId}_${chapterId}`

export const useReaderStore = defineStore(
  'reader',
  () => {
    //目录
    const tocMap = ref({})
    //进度
    const progressMap = ref({})
    //章节缓存状态
    const chapterCacheState = ref({})

    const setTOC = (bookId, toc) => {
      tocMap.value[bookId] = toc
    }

    const getTOC = (bookId) => {
      return tocMap.value[bookId] || null
    }

    const setProgress = (bookId, progress) => {
      progressMap.value[bookId] = progress
    }

    const getProgress = (bookId) => {
      return progressMap.value[bookId] || null
    }

    const getChapter = async (bookId, chapterId) => {
      const db = await dbPromise
      const key = getChapterKey(bookId, chapterId)
      const content = await db.get('chapters', key)
      chapterCacheState.value[key] = content ? 'cached' : 'not_cached'
      return content
    }

    const cacheChapter = async (bookId, chapterId, content) => {
      const db = await dbPromise
      const key = getChapterKey(bookId, chapterId)
      await db.put('chapters', content, key)
      chapterCacheState.value[key] = 'cached'
    }

    const clearChapterCache = async () => {
      const db = await dbPromise
      await db.clear('chapters')
      chapterCacheState.value = {}
    }
    return {
      setTOC,
      getTOC,
      setProgress,
      getProgress,
      getChapter,
      cacheChapter,
      clearChapterCache
    }
  },
  { persist: true }
)

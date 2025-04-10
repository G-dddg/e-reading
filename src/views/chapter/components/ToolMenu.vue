<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { BUIsStarService, BUToggleStarService } from '@/api/book-user.js'
import {
  Collection,
  CircleCheck,
  Top,
  Setting,
  Reading,
  Memo
} from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter()
const bookId = +route.params.bookId
//收藏状态
const isStar = ref(false)
const changeStar = async () => {
  BUToggleStarService(bookId)
  isStar.value = !isStar.value
}

onMounted(async () => {
  isStar.value = await BUIsStarService(bookId)
})
//目录
const emit = defineEmits(['showChapters'])
</script>
<template>
  <div class="container">
    <el-button type="primary" class="item" @click="emit('showChapters')">
      <span>
        <el-icon size="20"> <Memo /> </el-icon> <br />目录
      </span>
    </el-button>
    <el-button type="primary" class="item" @click="changeStar">
      <span v-if="isStar">
        <el-icon size="20"><CircleCheck /></el-icon><br />已收藏
      </span>
      <span v-else>
        <el-icon size="20"><Collection /></el-icon> <br />加入书架
      </span>
    </el-button>
    <el-button
      type="primary"
      class="item"
      @click="router.push(`/book/${bookId}`)"
    >
      <span>
        <el-icon size="20"><Reading /></el-icon> <br />书籍详情
      </span>
    </el-button>
    <el-button type="primary" class="item">
      <span>
        <el-icon size="20"><Setting /></el-icon><br />设置
      </span>
    </el-button>
    <el-backtop class="backtop">
      <el-icon size="30"><Top /></el-icon>
    </el-backtop>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.item {
  margin: 0;
  border-radius: 5px;
  height: 60px;
  width: 70px;
  border: none;
  cursor: pointer;
}
.backtop {
  border-radius: 60px;
  height: 60px;
  width: 60px;
  left: 4px;
  top: 93%;
}
</style>

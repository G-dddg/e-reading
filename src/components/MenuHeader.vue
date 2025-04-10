<script setup>
import { ref } from 'vue'
import MenuPerson from '@/components/MenuPerson.vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
//路由
const router = useRouter()
const route = useRoute()
//菜单跳转
const handleNav = (path) => {
  router.push(`/books/${path}`)
}
//
const logo = ref('')
const open = (type) => {
  logo.value = type
}
const handleLogo = () => {
  logo.value === 'person' ? router.push('/person') : router.push('/')
}
defineExpose({
  open
})
//搜索框
const search = defineModel()
const handleSearch = () => {
  search.value = search.value.trim()
  if (search.value === '') {
    ElMessage.warning('请输入搜索内容')
    return
  }
  if (route.path === '/book/search') {
    router.replace(`/book/search?keyword=${search.value}`)
  } else {
    router.push(`/book/search?keyword=${search.value}`)
  }
}
</script>
<template>
  <div class="navbar">
    <!-- 标题 -->
    <div class="logo" @click="handleLogo()">
      <div v-if="logo === 'person'" class="logo-text">个人中心</div>
      <div v-else class="logo-icon"></div>
    </div>
    <!-- 首页 -->
    <el-link @click="handleNav('home')">首页</el-link>
    <el-divider direction="vertical" />

    <!-- 排行榜 -->
    <el-link @click="handleNav('rank')">排行榜</el-link>
    <el-divider direction="vertical" />

    <!-- 搜索框 -->
    <div class="search-container">
      <el-input
        v-model="search"
        placeholder="输入书名/作者"
        class="search-input"
        @keyup.enter="handleSearch"
      />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>

    <!-- 用户名及下拉菜单 -->
    <MenuPerson></MenuPerson>
    <el-divider direction="vertical" />

    <!-- 我的书架 -->
    <el-link @click="handleNav('')">我的书架</el-link>
  </div>
</template>

<style scoped>
.navbar {
  min-width: max-content;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px 0 0;
  background-color: white;
  .logo {
    cursor: pointer;
    display: inline-block; /* 让 div 适应背景图片大小 */

    .logo-icon {
      width: 120px; /* 设定合适的宽度 */
      height: 40px; /* 设定合适的高度 */
      background: url('@/assets/logo.png') no-repeat center center;
      background-size: contain; /* 让图片完整显示，不拉伸 */
    }
    .logo-text {
      font-family: '微软雅黑';
      font-size: 30px;
      font-weight: bold;
      color: #287fd5;
      text-align: center;
    }
  }

  .search-container {
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin: 0 8px 0 8px;
  }
  .search-input {
    margin-right: 8px;
  }
}
</style>

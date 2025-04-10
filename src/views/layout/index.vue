<script setup>
import { Search } from '@element-plus/icons-vue'
import MenuPerson from '@/components/MenuPerson.vue'
import { onMounted, ref, onUnmounted } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const search = ref('')
const router = useRouter()
const handleSearch = () => {
  if (search.value.trim() !== '') {
    router.push(`/book/search?keyword=${search.value.trim()}`)
  } else {
    ElMessage.warning('请输入搜索内容')
  }
}
//item
const isLargeScreen = ref(window.innerWidth > 768)
const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth > 768
  console.log(window.innerWidth)
  console.log(isLargeScreen)
}
onMounted(() => {
  userStore.getUser()
  window.addEventListener('resize', updateScreenSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>
<template>
  <el-container class="layout-container">
    <el-header>
      <div class="header">
        <span><strong>在线阅读系统</strong></span>
        <!-- 个人 -->
        <MenuPerson></MenuPerson>
      </div>
      <div v-if="false" class="advertisement">广告暂位</div>
      <div class="search">
        <el-input
          v-model="search"
          class="search-input"
          :prefix-icon="Search"
          @keyup.enter="handleSearch"
          placeholder="请输入书名/作者"
        ></el-input>
        <el-button type="primary" size="large" @click="handleSearch"
          >搜索</el-button
        >
      </div>
    </el-header>
    <el-container>
      <el-header width="200px">
        <el-menu
          :ellipsis="false"
          mode="horizontal"
          :default-active="$route.path"
          router
        >
          <div class="logo" @click="$router.push('/books/home')"></div>
          <el-menu-item index="/books/home">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/books/rank">
            <span>排行榜</span>
          </el-menu-item>
          <el-menu-item index="/books">
            <span>我的书架</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <!-- 主体 -->
      <el-container>
        <router-view v-slot="{ Component }">
          <component :is="Component" :isLargeScreen="isLargeScreen"></component>
        </router-view>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
  width: 80%;
  min-width: 700px;
  margin: auto;
  background-color: #ffffff;
  .el-header {
    height: auto;
    padding: 0;
    .header {
      padding: 3px 20px;
      background-color: #f7f7f7;
      align-items: center;
      display: flex;
      justify-content: space-between;
    }
    .advertisement {
      height: 100px;
      background-color: #409eff;
    }
    .search {
      margin: 15px;
      display: flex;
      justify-content: center;
      .search-input {
        width: 50vw;
        margin-right: 5px;
      }
    }
  }

  .el-main {
    min-width: 360px;
  }
  .el-menu {
    align-items: center;
  }
  .el-menu :nth-child(4) {
    margin-left: auto;
  }
  .el-menu-item.is-active {
    color: #409eff;
    background-color: white !important;
  }
  .logo {
    cursor: pointer;
    display: inline; /* 让 div 适应背景图片大小 */
    width: 120px; /* 设定合适的宽度 */
    height: 40px; /* 设定合适的高度 */
    background: url('@/assets/logo.png') no-repeat center center;
    background-size: contain; /* 让图片完整显示，不拉伸 */
    margin: 0 30px;
  }
}
</style>

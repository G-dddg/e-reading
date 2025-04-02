<script setup>
import { Search } from '@element-plus/icons-vue'
import MenuPerson from '@/components/MenuPerson.vue'
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
          class="search-input"
          :prefix-icon="Search"
          placeholder="请输入书名/作者"
        ></el-input>
        <el-button type="primary" size="large">搜索</el-button>
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
          <el-menu-item index="/books/bookshelf">
            <span>我的书架</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <!-- 主体 -->
      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
  width: 80%;
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

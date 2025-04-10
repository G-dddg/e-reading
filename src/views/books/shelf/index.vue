<script setup>
// import { useRoute } from 'vue-router'

// const route = useRoute()
</script>
<template>
  <el-container>
    <el-aside>
      <!-- 菜单 -->
      <el-menu
        active-background-color="#409EFF"
        mode="vertical"
        :default-active="$route.path"
        router
      >
        <el-menu-item index="/books/shelf"> 我的收藏</el-menu-item>
        <el-menu-item index="/books/history"> 浏览记录</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<style scoped lang="scss">
.el-aside {
  width: 180px;
}
.el-main {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.el-menu {
  height: 100%;
}
.el-menu-item {
  justify-content: center;
  text-align: center;
}
.el-menu-item.is-active {
  color: #409eff;
  background-color: #ecf5ff !important;
}
</style>

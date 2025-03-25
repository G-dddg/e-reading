<script setup>
import {
  Search,
  CaretBottom,
  User,
  SwitchButton
} from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { userLogoutService } from '@/api/user'
import { confirmTocken } from '@/utils/methods'
//获取用户信息
const userStore = useUserStore()
onMounted(() => {
  if (!userStore.token) userStore.getUserInfo()
  // userStore.userName = 'asdasd'
})
//路由
const router = useRouter()
//退出登录
const handleLogout = async () => {
  await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await userLogoutService()
  userStore.removeUserInfo()
  ElMessage.success('退出成功')
  router.push('/login')
}
const handleSelect = (key) => {
  if (key === 'bookshelf') {
    confirmTocken()
  }
}
//处理菜单
</script>
<template>
  <el-container class="layout-container">
    <el-header>
      <div class="header">
        <span><strong>在线阅读系统</strong></span>
        <el-dropdown v-if="userStore.userName !== undefined">
          <span class="el-dropdown__box">
            <span>用户：{{ userStore.userName }}</span>
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item
                @click="handleLogout"
                command="logout"
                :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span v-else>
          <el-link
            type="primary"
            :underline="false"
            @click="router.push('/login')"
            >登录</el-link
          >
        </span>
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
      <el-aside width="200px">
        <div class="title"><strong>文章分类</strong></div>
        <!-- 分类组件 -->
        <div style="border-right: 1px solid darkgray; flex-grow: 1"></div>
      </el-aside>
      <el-container>
        <el-header>
          <el-menu
            @select="handleSelect"
            :ellipsis="false"
            mode="horizontal"
            default-active="0"
          >
            <el-menu-item index="home">
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="rank">
              <span>排行榜</span>
            </el-menu-item>
            <el-menu-item index="bookshelf">
              <span>我的书架</span>
            </el-menu-item>
          </el-menu>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
  width: auto;
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
      .el-dropdown__box {
        display: flex;
        align-items: center;
        width: auto;
        &:focus {
          outline: none;
        }
      }
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
  .el-aside {
    display: flex;
    flex-direction: column;
    .title {
      justify-content: center;
      display: flex;
      padding-top: 10px;
      font-size: x-large;
    }
  }
  .el-menu :nth-child(3) {
    margin-left: auto;
  }
}
</style>

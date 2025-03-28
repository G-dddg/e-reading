<script setup>
import {
  Search,
  CaretBottom,
  User,
  SwitchButton
} from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { userLogoutService } from '@/api/user'
import { confirmToken } from '@/utils/methods'
import LargeBookItem from './components/LargeBookItem.vue'
import SmallBookItem from './components/SmallBookItem.vue'
//获取用户信息
const userStore = useUserStore()
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
  userStore.removeUser()
  ElMessage.success('退出成功')
  router.push('/login')
}
//处理菜单
const activeMenu = ref('home')
const handleSelect = async (key) => {
  if (key === 'bookshelf') {
    await confirmToken()
  }
  activeMenu.value = key
}
//item类型
const isLargeScreen = ref(window.innerWidth > 768)
const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth > 768
  console.log(window.innerWidth)
  console.log(isLargeScreen)
}
onMounted(() => {
  //TODO:正式运用时取消注释,获取用户信息
  // if (!userStore.token) userStore.getUser()
  // userStore.userName = 'asdasd'

  // 添加窗口调整事件监听器
  window.addEventListener('resize', updateScreenSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
// 书籍列表
const books = ref([
  {
    cover: '@/assets/login_pic.png',
    title: '在云上的日子',
    author: '索斟政编',
    priceType: '免费',
    category: '文学',
    description:
      '一本关于青春、梦想与成长的故事，记录了云端之上的生活点滴，充满诗意与思考。'
  },
  {
    cover: '@/assets/login_pic.png',
    title: '人间草木',
    author: '汪曾祺',
    priceType: '付费',
    category: '散文',
    description:
      '汪曾祺笔下的世间草木，人情风物，温暖而细腻，让人感受到最纯真的生活气息。'
  },
  {
    cover: '@/assets/login_pic.png',
    title: '三体',
    author: '刘慈欣',
    priceType: 'VIP专享',
    category: '科幻',
    description:
      '人类文明与外星文明的生死较量，一场跨越宇宙的思维碰撞，揭示科学与哲学的终极命re agr题。'
  },
  {
    cover: '@/assets/login_pic.png',
    title: '白夜行',
    author: '东野圭吾',
    priceType: '付费',
    category: '推理',
    description:
      '一场跨越十九年的追踪调查，隐藏在黑暗中的秘密，谁才是真正的受害者？'
  },
  {
    cover: '@/assets/login_pic.png',
    title: '解忧杂货店',
    author: '东野圭吾',
    priceType: '免费',
    category: '小说',
    description:
      '一间可以倾诉烦恼的杂货店，跨越时空的信件往来，温暖治愈每一个孤独的灵魂。'
  },
  {
    cover: '@/assets/login_pic.png',
    title: '小王子',
    author: '安托万·德·圣-埃克苏佩里',
    priceType: 'VIP专享',
    category: '童话',
    description:
      '一位小王子在宇宙间的旅程，探索爱与责任，简单却充满哲理，带给人们深刻的感悟。'
  }
])
</script>
<template>
  <el-container class="layout-container">
    <el-header>
      <div class="header">
        <span><strong>在线阅读系统</strong></span>
        <el-dropdown v-if="userStore.user.userName !== undefined">
          <span class="el-dropdown__box">
            <span>用户：{{ userStore.user.userName }}</span>
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
            default-active="home"
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
        <!-- 主体 -->
        <el-main>
          <div v-if="!userStore.token && activeMenu === 'bookshelf'">
            您还未登录，请先登录
          </div>
          <LargeBookItem v-if="isLargeScreen" :books="books"></LargeBookItem>
          <SmallBookItem v-else :books="books"></SmallBookItem>
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
  .el-main {
    min-width: 360px;
  }
}
</style>

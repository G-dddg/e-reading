<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { confirmToken } from '@/utils/methods'
import LargeBookItem from './components/LargeBookItem.vue'
import SmallBookItem from './components/SmallBookItem.vue'
import { bookGetListService, bookGetStartBooksService } from '@/api/book'
import MenuPerson from '@/components/MenuPerson.vue'
import { useMenuStore } from '@/stores'
import { storeToRefs } from 'pinia'
//
const isLogin = ref(false)
//处理菜单
const { activeMenu } = storeToRefs(useMenuStore())
const handleSelect = async (key) => {
  isloading.value = false
  params.value = paramsDefault
  activeMenu.value = key
  if (key === 'bookshelf') {
    await confirmToken()
    //TODO:获取用户收藏书籍列表
    if (isLogin.value) getBooks(bookGetStartBooksService)
  } else if (key === 'home') {
    getBooks(bookGetListService)
  } else {
    //TODO:获取排行榜书籍列表
    params.value = { ...paramsDefault }
    getBooks(bookGetListService)
  }
}
//item类型
const isLargeScreen = ref(window.innerWidth > 768)
const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth > 768
  console.log(window.innerWidth)
  console.log(isLargeScreen)
}

// 书籍列表
const books = ref([])
const isloading = ref(false)
const total = ref(0)
const paramsDefault = {
  keyword: '',
  page: 0,
  size: 10
}
const params = ref({ ...paramsDefault })
const getBooks = async (fetchFunction) => {
  isloading.value = true
  books.value = []
  const res = await fetchFunction(params.value)
  books.value = res
  total.value = res.length
  isloading.value = false
}
// 处理分页
const handleCurrentChange = (page) => {
  params.value.page = page - 1
  window.scrollTo({ top: 0, behavior: 'smooth' }) // 回到顶部
  if (activeMenu.value === 'bookshelf') {
    getBooks(bookGetStartBooksService)
  } else {
    getBooks(bookGetListService)
  }
}
onMounted(() => {
  //TODO:正式运用时取消注释,获取用户信息
  // if (!userStore.token) userStore.getUser()
  // userStore.userName = 'asdasd'
  //获取书籍列表
  params.value = { ...paramsDefault }
  getBooks(bookGetListService)
  // 添加窗口调整事件监听器
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
        <MenuPerson @isLogin="isLogin"></MenuPerson>
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
            :default-active="activeMenu"
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
        <el-main v-loading="isloading" :element-loading-text="'加载中...'">
          <!-- <div v-if="!userStore.token && activeMenu === 'bookshelf'">
            您还未登录，请先登录
          </div>
          <LargeBookItem
            v-if="isLargeScreen"
            :books="books.content"
          ></LargeBookItem>
          <SmallBookItem v-else :books="books.content"></SmallBookItem>
          <-- 分页 ->
          <div style="display: flex; justify-content: center">
            <el-pagination
              v-model:current-page="books.pageNumber"
              v-model:page-size="books.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="books.totalElements"
              @current-change="handleCurrentChange"
            />
          </div> -->
          <!-- TODO 更换-->
          <div v-if="!isLogin && activeMenu === 'bookshelf'">
            您还未登录，请先登录
          </div>
          <div v-else>
            <LargeBookItem v-if="isLargeScreen" :books="books"></LargeBookItem>
            <SmallBookItem v-else :books="books"></SmallBookItem>
            <div style="display: flex; justify-content: center">
              <el-pagination
                v-model:current-page="params.page"
                v-model:page-size="params.size"
                layout="total, prev, pager, next, jumper"
                :total="total"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
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

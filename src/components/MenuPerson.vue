<script setup>
import { CaretBottom, User, SwitchButton } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { userLogoutService } from '@/api/user'
import { useUserStore } from '@/stores'
//获取用户信息
const userStore = useUserStore()
//路由
const router = useRouter()
const handleLogout = async () => {
  await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await userLogoutService()
  userStore.removeUser()
  userStore.removeToken()
  ElMessage.success('退出成功')
  router.push('/login')
}
defineEmits(['isLogin'])
const isLogin = userStore.token !== ''
</script>
<template>
  <el-dropdown v-if="isLogin">
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
    <el-link type="primary" :underline="false" @click="router.push('/login')"
      >登录/注册</el-link
    >
  </span>
</template>
<style scoped>
.el-dropdown__box {
  display: flex;
  align-items: center;
  width: auto;
  &:focus {
    outline: none;
  }
}
</style>

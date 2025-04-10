<script setup>
import { ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { userLoginService, userRegisterService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
// 控制是否显示登录
const isLogin = ref(true)

//路由
const router = useRouter()
const route = useRoute()

//仓库数据
const userStore = useUserStore()

// 表单引用
const formRef = ref(null)

// 表单数据
const dataForm = ref({
  userName: '',
  userPassword: '',
  confirmPassword: '',
  userSex: '1'
})

// 校验规则
const rules = {
  userName: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: '昵称长度需在2-10个字符之间', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度需在6-15个字符之间', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9]+$/,
      message: '密码只能包含字母或数字',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== dataForm.value.userPassword) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 登录操作
const handleLogin = async () => {
  await formRef.value.validate()
  const res = await userLoginService(dataForm.value)
  console.log(res)
  userStore.setTocken(res)
  await userStore.getUser()
  ElMessage.success('登录成功')
  const url = route.query.backUrl || '/'
  router.replace(url)
}

//注册操作
const handleRegister = async () => {
  await formRef.value.validate()
  await userRegisterService(dataForm.value)
  ElMessage.success('注册成功')
  isLogin.value = true
}
//清空表单
watch(isLogin, () => {
  dataForm.value = {
    userName: '',
    userPassword: '',
    confirmPassword: '',
    userSex: '1'
  }
})
</script>
<template>
  <el-row class="login_page">
    <el-col :span="12" class="bg"></el-col>
    <el-col class="form" :span="6" :offset="3">
      <!-- 登录表单 -->
      <el-form
        v-if="isLogin"
        ref="formRef"
        :model="dataForm"
        :rules="rules"
        autocomplete="off"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input
            :prefix-icon="User"
            v-model="dataForm.userName"
            placeholder="请输入用户名"
          />
        </el-form-item>

        <el-form-item prop="userPassword">
          <el-input
            v-model="dataForm.userPassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false" @click="isLogin = false">
              注册 →
            </el-link>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button class="button" type="primary" @click="handleLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 注册表单 -->
      <el-form
        v-else
        ref="formRef"
        :model="dataForm"
        :rules="rules"
        autocomplete="off"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input
            :prefix-icon="User"
            v-model="dataForm.userName"
            placeholder="请输入用户名"
          />
        </el-form-item>

        <el-form-item prop="userPassword">
          <el-input
            v-model="dataForm.userPassword"
            type="password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
          />
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input
            v-model="dataForm.confirmPassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          />
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="dataForm.userSex">
            <el-radio value="1" size="large">男</el-radio>
            <el-radio value="0" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button" @click="handleRegister"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isLogin = true">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.login_page {
  height: 100vh;
  background-color: white;
}
.bg {
  background: url('@/assets/login_pic.png') no-repeat center / contain;
  background-color: #f3f3f3;
  border-radius: 0 20px 20px 0;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.button {
  width: 100%;
}
.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>

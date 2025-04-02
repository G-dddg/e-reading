<script setup>
import { defineProps } from 'vue'
import { computed } from 'vue'
const props = defineProps({
  bookTypes: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: '分类'
  }
})
//添加全部选项
const categories = computed(() => [
  { bookTypeId: -1, bookTypeName: '全部' },
  ...props.bookTypes
])
//处理点击事件
const handleSelect = (bookTypeName) => {
  console.log(bookTypeName)
  //跳转到书籍列表页面
}
</script>
<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <el-row>
      <el-col :span="12" v-for="item in categories" :key="item.bookTypeId">
        <el-link
          :underline="false"
          class="item"
          @click="handleSelect(item.bookTypeName)"
          >{{ item.bookTypeName }}</el-link
        >
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.container {
  border: #dcdfe6 1px solid;
  border-radius: 10px;
  margin: 20px 10px 0 0;
  padding: 0 10px;
}
.title {
  position: relative;
  line-height: 16px;
  font-size: 20px;
  bottom: 8px;
  margin: auto;
  width: fit-content;
  background-color: white;
}
.el-col:focus {
  background-color: burlywood;
}
.el-col {
  cursor: pointer;
  align-items: center;
  text-align: center;
  margin: 0 0 10px 0;
}
.el-link {
  color: black;
  font-size: 16px;
  caret-color: transparent;
}
</style>

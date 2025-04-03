<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'
const props = defineProps({
  array: {
    type: Array,
    default: () => [],
    validator: (value) => Array.isArray(value)
  },
  idKey: {
    type: String,
    default: 'id'
  },
  nameKey: {
    type: String,
    default: 'name'
  },
  title: {
    type: String,
    default: '分类'
  },
  default: {
    type: String
  }
})
//添加全部选项
const categories = computed(() => [
  ...(props.default ? [] : [{ [props.idKey]: -1, [props.nameKey]: '全部' }]),
  ...props.array
])
//传递的参数
const emit = defineEmits(['select'])

//初始化选项
const selectedType = ref()
const initSelect = () => {
  selectedType.value = props.default ? props.array[0][props.idKey] : -1
}
//处理点击事件
const handleSelect = (item) => {
  selectedType.value = item[props.idKey]
  emit('select', item)
}
onMounted(() => {
  initSelect()
})
</script>
<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <el-row>
      <el-col :span="12" v-for="item in categories" :key="item[idKey]">
        <div
          class="item"
          :class="{ selected: item[idKey] === selectedType }"
          @click="handleSelect(item)"
        >
          {{ item[nameKey] }}
        </div>
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
.el-col {
  cursor: pointer;
  margin: 0 0 10px 0;
}
.item {
  align-items: center;
  text-align: center;
  caret-color: transparent;
}
.selected {
  border-radius: 3px;
  background-color: #409eff;
  color: white;
  outline: 2px solid #409eff;
}
</style>

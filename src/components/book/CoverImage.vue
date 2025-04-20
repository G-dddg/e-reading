<script setup>
import { images } from '@/utils/general'
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
const props = defineProps({
  src: {
    type: String
  },
  lazy: {
    type: Boolean,
    default: true
  }
})
const observer = ref(null)
const imageRef = ref(null)
//图片地址
const realSrc = ref('')
//加载图片
const loadImage = () => {
  realSrc.value = images(props.src)
}
//懒加载图片
const lazyImage = () => {
  observer.value = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting) {
      loadImage()
      observer.value.disconnect()
    }
  })
  if (imageRef.value) {
    observer.value.observe(imageRef.value)
  }
}
watch(
  () => props.src,
  () => {
    if (props.src) {
      if (props.lazy) {
        lazyImage()
      } else {
        loadImage()
      }
    }
  }
)
//挂载后
onMounted(() => {
  if (props.src) {
    if (props.lazy) {
      lazyImage()
    } else {
      loadImage()
    }
  }
})
onBeforeUnmount(() => {
  if (props.lazy && observer.value) {
    observer.value.disconnect()
  }
})
</script>
<template>
  <img ref="imageRef" :src="realSrc" class="book-cover" alt="书籍封面" />
</template>
<style>
.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

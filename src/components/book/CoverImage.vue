<script setup>
import { images } from '@/utils/general'
import { ref, onMounted } from 'vue'
const props = defineProps({
  src: {
    type: String
  },
  lazy: {
    type: Boolean,
    default: false
  }
})
const observer = ref(null)
const imageRef = ref(null)

const realSrc = ref('')
onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting) {
      realSrc.value = images(props.src)
      observer.value.disconnect()
    }
  })
  if (imageRef.value) {
    observer.value.observe(imageRef.value)
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

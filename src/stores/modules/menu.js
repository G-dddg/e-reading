import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useMenuStore = defineStore('menu', () => {
  const activeMenu = ref('home')
  return {
    activeMenu
  }
})

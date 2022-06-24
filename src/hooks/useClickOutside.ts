/**
 * 抽取点击下拉框外部的逻辑
 */
import { ref, onMounted, onUnmounted, Ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = true
      } else {
        isClickOutside.value = false
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside

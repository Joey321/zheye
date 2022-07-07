<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="handleToggleOpen">{{title}}</a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'

export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    // 开关下拉框
    const handleToggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    // 联合类型
    const dropdownRef = ref<null | HTMLElement>(null)
    // 点击下拉框外部关闭
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isClickOutside.value && isOpen.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      handleToggleOpen,
      isClickOutside,
      dropdownRef
    }
  }
})
</script>

<style scoped>

</style>

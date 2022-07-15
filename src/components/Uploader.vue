<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUpload">点击上传</button>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const handleFileChange = () => {
      return false
    }
    const fileInput = ref<null | HTMLInputElement>(null)
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    return {
      handleFileChange,
      fileInput,
      triggerUpload
    }
  }
})
</script>

<style scoped>

</style>

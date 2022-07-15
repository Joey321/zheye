<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUpload">
      <span v-if="fileStatus === 'success'">上传成功</span>
      <span v-else-if="fileStatus === 'loading'">正在上传</span>
      <span v-else-if="fileStatus === 'error'">上传失败</span>
      <span v-else>点击上传</span>
    </button>
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
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        fileStatus.value = 'loading'
        const uploadedFiles = Array.from(files)
        const formData = new FormData()
        // 上传一个文件
        formData.append(uploadedFiles[0].name, uploadedFiles[0])
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res: any) => {
          fileStatus.value = 'success'
          console.log('res', res)
        }).catch(() => {
          fileStatus.value = 'error'
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
            setTimeout(() => {
              fileStatus.value = 'ready'
            }, 2000)
          }
        })
      }
    }
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    return {
      handleFileChange,
      fileInput,
      triggerUpload,
      fileStatus
    }
  }
})
</script>

<style scoped>

</style>

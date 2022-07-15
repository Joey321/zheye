<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload">
      <slot v-if="fileStatus === 'success'" name="uploaded">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传</button>
      </slot>
      <slot v-else-if="fileStatus === 'error'" name="error">
        <button class="btn btn-primary">上传失败</button>
      </slot>
      <slot v-else>
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <slot name="image" :uploadedData="uploadedData">
      <img src="../assets/logo.png" alt="image" width="100" style="border: 1px solid #ccc; margin-top: 10px;">
    </slot>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    // 文件类型检查
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  emits: ['file-uploaded', 'uploaded-error'],
  setup (props, { emit }) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        // files都没有了？？
        console.log('----', files)
        const uploadedFiles = Array.from(files)
        if (props.beforeUpload) {
          // bug:beforeUpload第一次校验失败，第二次props.beforeUpload就没有了？
          console.log('11111', props.beforeUpload)
          const result = props.beforeUpload(uploadedFiles[0])
          if (!result) {
            return
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        // 上传一个文件
        formData.append(uploadedFiles[0].name, uploadedFiles[0])
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).then((res: any) => {
          fileStatus.value = 'success'
          uploadedData.value = res
          emit('file-uploaded', res.data)
        }).catch((error) => {
          fileStatus.value = 'error'
          emit('uploaded-error', error)
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
      fileStatus,
      uploadedData
    }
  }
})
</script>

<style scoped>

</style>

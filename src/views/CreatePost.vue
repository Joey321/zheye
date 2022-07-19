<template>
  <div class="create-post-page">
    <h4>{{isEditMode ? '编辑文章' : '新建文章'}}</h4>
    <Uploader
      action="/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded="fileUploaded"
      @uploaded-error="uploadedError"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
      <h1>点击上传头图</h1>
      <template #loading>
        <div d-flex>
          <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </template>
      <!-- 图片回显 -->
      <template #image="dataProps">
        <img src="../assets/logo.png" :alt="dataProps">
      </template>
    </Uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <validate-input
          label="文章标题："
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />{{titleVal}}
      </div>
      <div class="mb-3">
        <validate-input
          label="文章详情："
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />{{contentVal}}
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{isEditMode ? '更新文章' : '发表文章'}}
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useStore } from 'vuex'
import { PostProps } from '../testData'
import { useRouter } from 'vue-router'
import Uploader from '../components/Uploader.vue'
import { beforeUploadCheck } from '../components/helper'
import createMessage from '../components/createMessage'
import { ResponseData, ImageProps } from '../store'
export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm,
    Uploader
  },
  setup () {
    const titleVal = ref('')
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const store = useStore()
    const router = useRouter()
    const onFormSubmit = (res: boolean) => {
      console.log('res', res)
      if (res) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            createdAt: new Date().toLocaleString(),
            columnId
          }
          store.commit('createPost', newPost)
          const pushObj = { name: 'column', params: { id: columnId } }
          router.push(pushObj)
        }
      }
    }
    // 文件上传前校验
    const uploadCheck = (file: File) => {
      const condition = {
        format: ['image/jpeg', 'image/png'],
        size: 1
      }
      const result = beforeUploadCheck(file, condition)
      const { passed, error } = result
      if (error === 'format') createMessage('图片格式只能为JPG/PNG格式', 'error')
      if (error === 'size') createMessage('文件大小不能超过1MB', 'error')
      return passed
    }
    const fileUploaded = (rawData: ResponseData<ImageProps>) => {
      createMessage(`上传图片数据:${rawData.data}`, 'default')
    }
    const uploadedError = (rawData: ResponseData<ImageProps>) => {
      createMessage(`上传错误:${rawData}`, 'error')
    }
    const isEditMode = false
    return {
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit,
      isEditMode,
      titleVal,
      uploadCheck,
      fileUploaded,
      uploadedError
    }
  }
})
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
.create-post-page .file-upload img {
  width: 10%;
  height: 10%;
  object-fit: cover;
}
/* .uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
} */
</style>

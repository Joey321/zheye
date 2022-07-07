<template>
  <form class="form-vaildate-container">
    <slot></slot>
    <span class="submit-area" @click.prevent="handleSubmitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary btn-lg">提交</button>
      </slot>
    </span>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
// 创建监听器
export const emitter = mitt()

export default defineComponent({
  name: 'ValidateForm',
  emits: ['submit-form'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    const handleSubmitForm = () => {
      const result = funcArr.map(func => func()).every(bool => bool)
      context.emit('submit-form', result)
    }
    // 事件回调
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callback = (func: any) => {
      funcArr.push(func)
    }
    // 监听
    emitter.on('form-item-created', callback)
    // 销毁
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      handleSubmitForm
    }
  }
})
</script>

<style scoped>

</style>

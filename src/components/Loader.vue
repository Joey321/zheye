<template>
  <teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
      :style="{backgroundColor: background || ''}">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
        <!-- .visually-hidden 类在视觉上隐藏某个元素的同时，仍然能够被辅助技术（例如屏幕阅读器）识别 -->
          <span class="visually-hidden">{{text || 'Loading...'}}</span>
        </div>
        <div v-if="text" class="text-primary">{{text}}</div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  props: {
    text: String,
    background: String
  },
  setup () {
    // 创建一个DOM节点配合teleport
    // 手动创建节点会进debugger??? 在index.html写DOM不会报错
    // const node = document.createElement('div')
    // node.id = 'back'
    // document.body.appendChild(node)
    // onUnmounted(() => {
    //   document.removeChild(node)
    // })
    return {}
  }
})
</script>

<style scoped>
/* 半透明遮罩层 */
.loading-container {
  background: rgba(255, 255, 255, .5);
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>

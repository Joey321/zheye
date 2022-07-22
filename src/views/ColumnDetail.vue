<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
     <!-- <pre>{{route}}</pre> -->
    <PostList :list="list"></PostList>
    <Modal
      title="确认删除？"
      :visible="isVisible"
      @modal-on-close="onClose"
      @modal-on-confirm="hideAndDelete">
      <p>{{`删除名为${column.title}的文章`}}</p>
    </Modal>
    <button @click.prevent="isVisible = true" class="btn btn-danger">删除</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
// import { testData, testPosts } from '../testData.ts'
import { useStore } from 'vuex'
import PostList from '../components/PostList.vue'
import Modal from '../components/Modal.vue'
export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList,
    Modal
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    // +转字符
    const currentId = route.params.id
    // const column = testData.find(c => c.id === currentId) // find返回id相等的第一个元素
    // const list = testPosts.filter(p => p.columnId === currentId)// filter返回id相等的元素组成的对象
    // 以下两行报错？
    // const column = computed(() => store.state.columns.find(c => c.id === currentId))
    // const list = computed(() => store.state.posts.filter(p => p.columnId === currentId))

    const column = computed(() => store.getters.getColumnById(currentId))
    const list = computed(() => store.getters.getPostsById(currentId))

    const isVisible = ref(false)
    const onClose = () => {
      isVisible.value = false
    }
    const hideAndDelete = () => {
      isVisible.value = false
    }
    return {
      column,
      list,
      route,
      isVisible,
      onClose,
      hideAndDelete
    }
  }
})
</script>

<style scoped>

</style>

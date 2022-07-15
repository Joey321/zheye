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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
// import { testData, testPosts } from '../testData.ts'
import { useStore } from 'vuex'
import PostList from '../components/PostList.vue'
export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
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
    return {
      column,
      list,
      route
    }
  }
})
</script>

<style scoped>

</style>

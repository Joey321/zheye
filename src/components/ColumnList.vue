<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light w-25 my-3" />
          <h5>{{column.title}}</h5>
          <p>{{column.description}}</p>
          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</router-link>

          <!-- <RouterLink :to="{name: 'column', params:{id: column.id}}" class="btn btn-outline-primary">进入专栏</RouterLink>
          {{`/column/${column.id}`}}
          <RouterLink :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</RouterLink> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
export interface ColumnProps {
  id: number,
  avatar?: string,
  title: string,
  description: string
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    // 重新计算 为无avatar的专栏添加默认avatar
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('../assets/avatar.jpg')
        }
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style scoped>

</style>

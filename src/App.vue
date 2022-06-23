<template>
  <div class="container">
    <GlobalHeader :user="currentUser"/>
    <ColumnList :list="testData"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
const testData: ColumnProps[] = [
  {
    id: 1,
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150',
    title: 'test title',
    description: 'test description'
  },
  {
    id: 2,
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150',
    title: 'test title2',
    description: 'test description2'
  },
  {
    id: 3,
    title: 'test title3',
    description: 'test description3'
  },
  {
    id: 4,
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150',
    title: 'test title4',
    description: 'test description4'
  }
]
const currentUser: UserProps = {
  isLogin: true,
  id: 1,
  name: 'zhangsan'
}

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup () {
    return {
      testData,
      currentUser
    }
  }
})
</script>

<style scoped>

</style>

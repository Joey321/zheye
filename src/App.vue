<template>
  <div class="container">
    <GlobalHeader :user="currentUser"/>
    <h1>{{error.message}}</h1>
    <RouterView />
    <Loader text='拼命加载中...' background="rgba(0, 0, 0, .2)" v-if="isLoading" />
    <!-- <Message :message="'loginMessage'" :type="'success'" /> -->
    <!-- 底部 -->
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import store from './store'
import Loader from './components/Loader.vue'
// import Message from './components/Message.vue'
import createMessage from './components/createMessage'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup () {
    // const loginMessage = ref('')
    // const loginType = ref('default')
    onMounted(() => {
      // 登录状态持久化
      const token = store.state.token
      const isLogin = store.state.user.isLogin
      // 初始化有token且未登录
      // 在login设置Authorization头并发送获取用户信息请求
      // 请求成功显示currentUser
      if (token && !isLogin) {
        // store.dispatch('loginAndFetch')
        store.commit('login')
        createMessage('login success', 'success')
      }
    })
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>

<style scoped>

</style>

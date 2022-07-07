vbase<template>
  <div>
    <h1>Login Page</h1>
    <button type="button" @click="handleClick(true)">登录</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Login',
  setup () {
    const router = useRouter()
    const store = useStore()
    const handleClick = (result: boolean) => {
      if (result) {
        console.log('result', result)
        router.push('/')
        console.log(store.state.user)
        store.commit('login')
        console.log(store.state.user)
      }
    }
    return {
      router,
      handleClick
    }
  }
})
// bug:
// 1.App v-model双向绑定的优化
// columnList vue-route实现跳转
</script>

<style scoped>

</style>

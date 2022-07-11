import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 配置默认endpoints
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  // 配置请求时携带的请求参数
  // 这里请求接口需要默认传递icode参数
  config.params = { ...config.params, icode: 'C6A6C4086133360B' }
  // 发送请求加loading效果
  console.log('----request')
  store.commit('setLoading', true)
  return config
})

axios.interceptors.response.use(response => {
  // 请求响应移除loading效果
  console.log('----response')
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 2000)
  return response
})

const app = createApp(App)
// 将axios挂载到原型
app.config.globalProperties.$http = axios

app.use(router).use(store).mount('#app')

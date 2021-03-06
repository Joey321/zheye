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
  // 在发送请求时加loading效果
  console.log('----request')
  store.commit('setLoading', true)
  return config
})

axios.interceptors.response.use(response => {
  // 请求响应移除loading效果
  console.log('----response')
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return response
}, e => {
  // const { error } = e.response.data
  console.log('error:', e)
  const error = '出错啦'
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

const app = createApp(App)
// 将axios挂载到原型
app.config.globalProperties.$http = axios

app.use(router).use(store).mount('#app')

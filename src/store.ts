import { createStore, Commit } from 'vuex'
import axios from 'axios'
import { testData, testPosts, ColumnProps, PostProps } from './testData'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

export interface GlobalDataProps {
  User: UserProps,
  // 专栏列表
  ColumnProps: ColumnProps[],
  // 专栏一对多关系的文章列表
  PostProps: PostProps[],
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

// 抽象actions中异步方法重复逻辑
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  // 返回一个Promise
  return data
}

const store = createStore({
  // 初始状态
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false,
      name: 'Joey1',
      columnId: '1'
    }
  },
  // 同步方法
  mutations: {
    login (state) {
      // 对象展开运算符，相同属性后者覆盖前者
      state.user = { ...state.user, isLogin: true, name: 'Joey2' }
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVmYWJjZTIzOWM3YWIxMjYzYmFiOTRjMyIsImVtYWlsIjoiMTExMUB0ZXN0LmNvbSIsIm5pY2tOYW1lIjoiVWx0cmFtYW4iLCJwYXNzd29yZCI6IiQyYSQxMCRwdkdzTFJCREtaY3l6aTJMWFp4WUNlbEZwcnhLYm1WMW1zV2tRQVJnNE1FdXpVb0cxbHNacSIsInJvbGUiOnsiX2lkIjoiNWU2MDY5OGJkYjYwZjY0YjU3ZTM2MTMzIiwibmFtZSI6Im5vcm1hbFVzZXIiLCJfX3YiOjAsImNyZWF0ZWRBdCI6IjIwMjAtMDMtMDVUMDI6NTI6NTkuODA4WiIsImFjY2VzcyI6InVzZXIifSwiX192IjowLCJjb2x1bW4iOiI1ZmFiY2UyMzljN2FiMTI2M2JhYjk0YzQiLCJkZXNjcmlwdGlvbiI6IuWRg-WRg-WRgyIsImNyZWF0ZWRBdCI6IjIwMjAtMTEtMTFUMTE6NDI6MjcuODc1WiJ9LCJleHAiOjE2NTgyMTQ2NDUsImlhdCI6MTY1NzYwOTg0NX0.KABotv7k3FeCHDge93azs55o7BNi4SRMuHsGsHXz2tg'
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = token
    },
    loginOnline (state, rawData) {
      // const { token } = rawData.data
      // state.token = token
      // localStorage.setItem('token', token)
      // axios.defaults.headers.common.Authorization = `Bearer ${token}`
      console.log('login数据', rawData)
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      // state.columns = rawData.data.list
      console.log('fetchColumns数据', rawData)
    },
    fetchColumn (state, rawData) {
      // state.columns = [rawData.data]
      console.log('fetchColumn数据', rawData)
    },
    fetchPosts (state, rawData) {
      console.log('fetchPosts数据', rawData)
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, e) {
      state.error = e
    },
    fetchCurrentUser (state, rawData) {
      // state.user = { isLogin: true, ...rawData.data }
      console.log('fetchColumns数据', rawData)
    }
  },
  // 异步方法
  actions: {
    fetchColumns (context) {
      getAndCommit('/columns', 'fetchColumns', context.commit)
    },
    fetchColumn ({ commit }, cid) {
      getAndCommit(`/colums/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      getAndCommit(`/colums/${cid}/posts`, 'fetchPosts', commit)
    },
    loginOnline ({ commit }, payload) {
      // 返回postAndCommit，postAndCommit中返回data (Promise) 这样调用时.then就能拿到data
      return postAndCommit('/user/login', 'loginOnline', commit, payload)
    },
    fetchCurrentUser ({ commit }) {
      getAndCommit('user/current', 'fetchCurrentUser', commit)
    },
    // 组合登录和获取用户信息的异步操作
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('loginOnline', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  // 相当于vuex中的computed
  getters: {
    getColumnById: (state) => (id: number) => {
      // 检查一下id类型
      // eslint-disable-next-line eqeqeq
      return state.columns.find(c => c.id == id)
    },
    getPostsById: (state) => (id: number) => {
      // eslint-disable-next-line eqeqeq
      return state.posts.filter(p => p.columnId == id)
    }
  }
})

export default store

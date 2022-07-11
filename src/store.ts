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

// 抽象actions中异步方法重复逻辑
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  // 这段逻辑写到main.js 拦截器interceptors去
  // commit('setLoading', true)
  // 延时2秒
  // await new Promise(resolve => setTimeout(resolve, 2000))
  const { data } = await axios.get(url)
  commit(mutationName, data)
  // commit('setLoading', false)
}

const store = createStore({
  // 初始状态
  state: {
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
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rowData) {
      // state.columns = rowData.data.list
      console.log('fetchColumns数据', rowData)
    },
    fetchColumn (state, rowData) {
      // state.columns = [rowData.data]
      console.log('fetchColumn数据', rowData)
    },
    fetchPosts (state, rowData) {
      console.log('fetchPosts数据', rowData)
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  // 异步方法
  actions: {
    async fetchColumns (context) {
      getAndCommit('/columns', 'fetchColumns', context.commit)
    },
    async fetchColumn ({ commit }, cid) {
      getAndCommit(`/colums/${cid}`, 'fetchColumn', commit)
    },
    async fetchPosts ({ commit }, cid) {
      getAndCommit(`/colums/${cid}/posts`, 'fetchPosts', commit)
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

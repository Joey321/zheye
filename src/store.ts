import { createStore } from 'vuex'
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

const store = createStore({
  // 初始状态
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false,
      name: 'Joey1',
      columnId: '1'
    }
  },
  // 方法
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
    }
  },
  actions: {
    fetchColumns (context) {
      const params = { params: { key: 'hello' } }
      axios.get('/columns', params).then(res => {
        console.log('----fetchColumns', res)
        context.commit('fetchColumns', res.data)
      })
    },
    fetchColumn ({ commit }, cid) {
      axios.get(`/colum/${cid}`).then(res => {
        console.log('----fetchColumn', res)
        commit('fetchColumn', res.data)
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

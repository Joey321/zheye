<template>
  <div class="container">
    <GlobalHeader :user="currentUser"/>
    <ColumnList :list="testData"/>
    <ValidateForm @submit-form="onSubmitForm">
      <ValidateInput
        :rules="emailRules"
        v-model:emailValue="emailValue"
        label="邮箱"
        placeholder="请输入邮箱"
      />
      <div>
        {{emailValue}}
      </div>
      <!-- <ValidateInput
        :rules="passwordRules"
        v-model:passwordValue="passwordValue"
        label="密码"
        placeholder="请输入密码"
      />
      {{passwordValue}} -->
      <template #submit>
        <button type="submit" class="btn btn-primary">提交</button>
        <!-- <button type="button" class="btn btn-danger" @click="handleClear">清空</button> -->
      </template>
    </ValidateForm>
    <RouterView />
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
import { defineComponent, ref, watch, nextTick, computed } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList from './components/ColumnList.vue'
import GlobalHeader from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
import { testData } from './testData'
import { useStore } from 'vuex'

// const testData: ColumnProps[] = [
//   {
//     id: 1,
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150',
//     title: 'test title',
//     description: 'test description'
//   },
//   {
//     id: 2,
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150',
//     title: 'test title2',
//     description: 'test description2'
//   },
//   {
//     id: 3,
//     title: 'test title3',
//     description: 'test description3'
//   },
//   {
//     id: 4,
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150',
//     title: 'test title4',
//     description: 'test description4'
//   }
// ]
// const currentUser: UserProps = {
//   isLogin: false,
//   id: 1,
//   name: 'zhangsan'
// }
const emailValue = ref('11')
const passwordValue = ref('22')
const onSubmitForm = (result: boolean) => {
  console.log(`监听到submit-form：${result}`)
  watch(emailValue, (newEmailValue: string) => {
    emailValue.value = newEmailValue
    if (!result) {
      nextTick(() => {
        emailValue.value = ''
      })
    }
  })
}
const handleClear = () => {
  emailValue.value = ''
}
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'password', message: '密码长度3~20位' }
    ]
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    return {
      testData,
      currentUser,
      emailRules,
      passwordRules,
      emailValue,
      passwordValue,
      onSubmitForm,
      handleClear
    }
  }
})
// input双向绑定有问题
</script>

<style scoped>

</style>

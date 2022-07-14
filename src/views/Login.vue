<template>
  <div>
    <ValidateForm @form-submit="onSubmitForm">
      <ValidateInput
        :rules="emailRules"
        v-model="emailValue"
        label="邮箱"
        placeholder="请输入邮箱"
        ref="emailRef"
      />
      {{emailValue}}
      <ValidateInput
        :rules="passwordRules"
        v-model="passwordValue"
        label="密码"
        placeholder="请输入密码"
        ref="passwordRef"
      />
      <template #submit>
        <button type="submit" class="btn btn-primary">提交</button>
        <button type="button" class="btn btn-danger mx-3" @click="handleClear">清空</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import createMessage from '../components/createMessage'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'password', message: '密码长度3~20位' }
    ]
    const emailValue = ref('1111')
    const passwordValue = ref('222')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const emailRef = ref<null | HTMLElement | any>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const passwordRef = ref<null | HTMLElement | any>(null)
    const onSubmitForm = (result: boolean) => {
      console.log(`监听到form-submit：${result}`)
      if (result) {
        console.log('result', result)
        const payload = {
          email: emailValue.value,
          password: passwordValue.value
        }
        console.log('payload', payload)
        // 登录然后获取用户信息
        // store.dispatch('loginAndFetch', payload).then(data => {
        // console.log('拿到登录响应的用户数据', data)
        //   router.push('/')
        // }).catch(e => {
        // console.log(e) //捕获错误 避免main.js中return Promise.reject(error)错误提示：Promise遇到未回收的reject错误都会在浏览器报错
        // })
        store.commit('login')
        createMessage('登录成功，两秒后跳转首页', 'success')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    }
    const handleClear = () => {
      // console.log('emailRef', emailRef.value.inputRef)
      // emailRef.value.inputRef.val = ''
      // passwordRef.value.inputRef.val = ''
      // 无法清空
      emailValue.value = ''
      passwordValue.value = ''
    }
    return {
      router,
      emailRules,
      passwordRules,
      onSubmitForm,
      handleClear,
      emailValue,
      passwordValue
    }
  }
})
</script>

<style scoped>

</style>

<template>
  <div class=" validate-input-container pb-3">
    <label class="form-label">{{label}}</label>
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    ></textarea>
    <div class="invalid-feedback" v-if="inputRef.error">{{inputRef.message}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
// 邮箱规则
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// 密码规则
// const passwordReg = /^.{3,20}$/
interface RuleProp {
  type: 'required' | 'email' | 'password';
  message: string
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'testarea'

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    emailValue: String,
    // passwordValue: String,
    label: {
      type: String,
      default: '标签'
    },
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  // 禁止根元素继承属性 可配合$attrs使用，使父元素不添加非props属性，子元素添加
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: props.emailValue || '',
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required': passed = (inputRef.val.trim() !== ''); break
            case 'email': passed = emailReg.test(inputRef.val); break
            // case 'password': passed = passwordReg.test(inputRef.val); break
            default: break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    const updateValue = (e: KeyboardEvent) => {
      const targetVal = (e.target as HTMLInputElement).value
      inputRef.val = targetVal
      // console.log('-----', targetVal)
      context.emit('update:emailValue', targetVal)
      // context.emit('update:passwordValue', targetVal)
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

<style scoped>

</style>

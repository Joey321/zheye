<template>
  <div class=" validate-input-container pb-3">
    <label class="form-label">{{label}}</label>
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      v-model="inputRef.val"
      @blur="validateInput"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      v-model="inputRef.val"
      @blur="validateInput"
      v-bind="$attrs"
    ></textarea>
    <div class="invalid-feedback" v-if="inputRef.error">{{inputRef.message}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, computed } from 'vue'
import { emitter } from './ValidateForm.vue'
// 邮箱规则
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// 密码规则
const passwordReg = /^.{3,20}$/
interface RuleProp {
  type: 'required' | 'email' | 'password'| 'custom';
  message: string;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'testarea'

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    passwordValue: String,
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
  emits: ['update:modelValue'],
  setup (props, context) {
    const inputRef = reactive({
      // 用计算属性监听依赖值的变化并将值发送出去(既监听了props的变化又简化了更新值的操作)
      val: computed({
        get: () => props.modelValue || '',
        set: val => context.emit('update:modelValue', val)
      }),
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
            case 'password': passed = passwordReg.test(inputRef.val); break
            case 'custom': passed = rule.validator ? rule.validator() : true; break
            default: break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style scoped>

</style>

<template>
  <div>
    <h1>Home Page</h1>
    <h2>{{fn}}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  setup () {
    const store = useStore()
    const list = computed(() => store.state.columns)
    const fn = computed(() => store.getters.fn)
    return {
      list,
      fn
    }
  }
})
</script>

<style scoped>

</style>

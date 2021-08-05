<template>
  <div class="test-comp">
    <div>title: {{title}}</div>
    <div>{{msg}}</div>
    <button @click="onClose">关闭</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: String,
    onClose: Function
  },
  setup() {
    const msg = '这是一个测试组件自己的msg'

    return {
      msg
    }
  },
})
</script>

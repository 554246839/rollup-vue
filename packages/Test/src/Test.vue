<template>
  <div>
    {{msg}}
    <ElButton @click="alert">element-plus button</ElButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { ElButton, ElMessage } from 'element-plus'

export default defineComponent({
  name: 'test',
  components: {
    ElButton
  },
  setup() {
    let msg = ref('test')

    function alert() {
      ElMessage({
        showClose: true,
        message: '这是一条消息提示'
      });
    }

    return { msg, alert }
  }
})
</script>

<template>
  <div>{{msg}}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'test2',
  setup() {
    let msg = ref('test2')

    return { msg }
  }
})
</script>

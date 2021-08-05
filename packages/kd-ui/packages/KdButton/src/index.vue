<template>
  <div>button: {{msg}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KdButton',
  props: {
    msg: String
  },
  setup() {
    
  },
})
</script>


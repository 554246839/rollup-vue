<template>
  <button @click="showDialog">show Dialog</button>
  <router-link :to="{path: '/home'}">to home</router-link> &nbsp;
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { kdJsonDialog } from '../../kd-ui/src'

export default defineComponent({
  name: 'App',
  setup() {
    let data = ref({
      a: {
        b: {
          c: 3
        }
      }
    })

    function showDialog() {
      kdJsonDialog({
        title: 'Cell Tag',
        data: {
          test: 123
        },
        height: '600px',
        buttons: [
          {
            icon: 'el-icon-finished',
            label: '初始化',
            type: 'warning',
            callback(data: any, close: Function, updateData: Function) {
              updateData({
                test123: 'test'
              })
            }
          }
        ],
        beforeClose() {
          console.log(1111111)
        },
        okClick(data: string) {
          console.log('okClick', data)
        }
      })
    }

    return { data, showDialog }
  }
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
}
</style>

<template>
  <div>
    <el-dialog
      v-model="visible"
      v-bind="dialogProps"
      :before-close="onClose"
      :title="title"
      :width="width"
    >
      <div>test content</div>
      <template #footer v-if="showFooter">
        <div class="dialog-footer">
          
          <template v-for="(item, index) in buttons" :key="index">
            <el-button
              size="small"
              round
              :type="item.type || 'warning'"
              :icon="item.icon"
              @click="item.callback({...data}, onClose, updateData)"
            >
              {{item.label}}
            </el-button>
          </template>

          <el-button size="small" round icon="el-icon-folder-checked" type="warning" v-if="showCancelBtn" @click="okClick">{{ okBtnText }}</el-button>
          <el-button size="small" round icon="el-icon-circle-close" v-if="showOkBtn" @click="onClose">{{ okCancelText }}</el-button>
        </div>
      </template> 
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from 'vue'
import { ElDialog, ElButton } from 'element-plus'

export default defineComponent({
  name: 'KdJsonDialog',
  components: {
    ElDialog,
    ElButton
  },
  props: {
    title: {
      type: String,
      default: '标题'
    },
    width: {
      type: String,
      default: '50%'
    },
    height: {
      type: String,
      default: '300px'
    },
    data: {
      type: Object,
      default: () => ({})
    },
    readonly: {
      type: Boolean,
      default: false
    },
    onClose: Function,
    okClick: Function,
    beforeClose: Function,
    dialogProps: Object,
    jsonOptions: Object,
    showOkBtn: {
      type: Boolean,
      default: true
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    okBtnText: {
      type: String,
      default: '确 定'
    },
    okCancelText: {
      type: String,
      default: '取 消'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    buttons: {
      type: Array
    }
  },
  emits: ['click'],
  setup(props: any) {
    const visible = ref(true)
    const data = ref(props.data)

    function beforeClose() {
      props.beforeClose && props.beforeClose()
    }

    function close() {
      visible.value = false
      setTimeout(() => {
        props.onClose()
      }, 500)
    }

    function okClick() {
      if (props.okClick) {
        props.okClick(toRaw(data.value), onClose)
      } else {
        onClose()
      }
    }

    function onClose() {
      beforeClose()
      close()
    }

    function updateData(newData) {
      data.value = newData
    }

    return {
      visible,
      data,
      onClose,
      okClick,
      updateData
    }
  }
})
</script>

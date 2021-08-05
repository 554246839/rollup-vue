
import { defineComponent } from 'vue'
import { createComponent, unmountComponent } from '../../../src/components/component'
import KdJsonDialog from './index.vue'

const dialogBoxConstructor = defineComponent(KdJsonDialog)

type Config = {
  [x in string]: any
}

let instance: any;

const defaults: Config = {
  dialogProps: {
    fullscreen: false,
    modal: true,
    lockScroll: true,
    customClass: '',
    closeOnClickModal: true,
    closeOnPressEscape: true,
    showClose: true,
    center: false,
    destroyOnClose: false,
  },
  readonly: false,
  onClose() {
    unmountComponent(instance)
  }
}

const showJsonDialog = (options: any) => {

  instance = createComponent(dialogBoxConstructor, options, null)

  document.body.appendChild(instance.vnode.el)
}


export const JsonDialog = function (options: any) {
  const dialogProps = {...defaults.dialogProps, ...options.dialogProps}
  showJsonDialog({...defaults, ...options, dialogProps})
}

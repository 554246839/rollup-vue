
import { defineComponent, h, render } from 'vue'
import TestComp from './testComp.vue'

// 生成一个唯一的key
const COMPONENT_CONTAINER_SYMBOL = Symbol('component_container')

/**
 * 创建组件实例对象
 * 返回的实例和调用 getCurrentComponent() 返回的一致
 * @param {*} Component
 */
function createComponent(Component: any, props: any, children: any) {
  // 创建vnode
  const vnode = h(Component, { ...props }, children)
  // 创建组件容器
  const container = document.createElement('div')
  // @ts-ignore 将组件容器挂载到vnode上，方便后续移除
  vnode[COMPONENT_CONTAINER_SYMBOL] = container
  // 将vnode渲染到组件容器内
  render(vnode, container)
  // 返回组件实例
  return vnode.component
}

/**
 * 销毁组件实例对象
 * @param {*} ComponnetInstance 通过createComponent方法得到的组件实例对象
 */
export function unmountComponent(ComponnetInstance: any) {
  console.log(ComponnetInstance)
  // 移除组件节点，render函数的第一个传null，表示为移除动作，会执行unmount方法
  render(null, ComponnetInstance.vnode[COMPONENT_CONTAINER_SYMBOL])
}

// 当前场景下是可以省略这一步转换，但是，就类型而言，defineComponent 返回的值有一个合成类型的构造函数
const componentConstructor = defineComponent(TestComp)

// 创建一个全局变量接收创建的组件实例
let instance: any;

// 创建节点
const showTestComponent = (options: any) => {
  // 创建组件实例对象
  instance = createComponent(componentConstructor, options, null)
  // 添加到body
  document.body.appendChild(instance.vnode.el)
}

export const testComp = function (options: any) {
  const close = options.onClose
  options.onClose = () => {
    close && close.call()
    // 移除元素
    unmountComponent(instance)
  }
  showTestComponent(options)
}

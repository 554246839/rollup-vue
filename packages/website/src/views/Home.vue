<template>
  <kd-table
    ref="kdTable"
    :columnData="columnData"
    :hidePagination="false"
    :buttons="buttons"
    :tableEvents="tableEvents"
    :getData="getData" />
</template>

<script lang="ts">
import { computed, defineComponent, h, reactive, ref, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const kdTable = ref(null)
    const selected = reactive(new Array(5)).fill('')
    const columnData = reactive([
      {
        isTemplate: false,
        columnProps: {
          prop: 'date',
          label: '日期',
          width: '150',
          sortable: true
        } 
      },
      {
        isTemplate: true,
        templateTag: 'router-link',
        templateProps(data: any) {
          return {
            to: '/'
          }
        },
        callback(row: any) {
          console.log(row, 'callback')
        },
        columnProps: {
          prop: 'name',
          label: '姓名',
          width: '120'
        } 
      },
      {
        isTemplate: true,
        getVnode(data: any, index: number) {
          return h('div', {
            className: 'testclass',
            style: {
              cursor: 'pointer'
            },
            onClick: () => {
              console.log(data, index)
            }
          }, data.province)
        },
        columnProps: {
          prop: 'province',
          label: '省份',
          width: '120'
        } 
      },
      {
        isTemplate: true,
        columnProps: {
          prop: 'city',
          label: '市区',
          width: '120'
        },
        templateTag: 'el-select',
        templateProps(row, index) {
          return {
            modelValue: selected[index],
            size: 'small'
          }
        },
        templateEvents(row, index) {
          return {
            change(val) {
              selected[index] = val
              console.log(val, 'change------', row, selected)
            }
          }
        },
        subComponent: [
          {
            name: 'el-option',
            props: {
              label: '男1',
              value: '1',
              disabled: computed(() => selected.includes('1'))
            },
            events: {},
            label: '男1'
          },
          {
            name: 'el-option',
            props: {
              label: '男2',
              value: '2',
              disabled: computed(() => selected.includes('2'))
            },
            events: {},
            label: '男2'
          },
          {
            name: 'el-option',
            props: {
              label: '男3',
              value: '3',
              disabled: computed(() => selected.includes('3'))
            },
            events: {},
            label: '男3'
          },
          {
            name: 'el-option',
            props: {
              label: '男4',
              value: '4',
              disabled: computed(() => selected.includes('4'))
            },
            events: {},
            label: '男4'
          },
          {
            name: 'el-option',
            props: {
              label: '男5',
              value: '5',
              disabled: computed(() => selected.includes('5'))
            },
            events: {},
            label: '男5'
          }
        ]
      },
      {
        isTemplate: false,
        columnProps: {
          prop: 'address',
          label: '地址'
        } 
      },
      {
        isTemplate: false,
        columnProps: {
          prop: 'zip',
          label: '邮编',
          width: '120'
        } 
      },
      { // 操作栏
        isTemplate: true,
        columnProps: {
          prop: 'handle',
          label: '操作',
          width: '150'
        },
        buttons: [
          {
            label: '编辑',
            isHide: (data: any) => {
              // console.log(data, 'ishide')
              return data.zip === 200334
            },
            callback(data: any) {
              console.log(data, 'edit')
            }
          },
          {
            label: '删除',
            callback(data: any) {
              console.log(data, 'delete')
            }
          }
        ]
      }
    ])

    const buttons = reactive([
      {
        icon: 'el-icon-finished',
        label: '新增',
        isHide: false,
        type: 'warning',
        callback() {
          console.log('新增')
        }
      },
      {
        icon: 'el-icon-finished',
        label: '结束',
        isHide: false,
        type: 'primary',
        callback() {
          console.log('结束')
        }
      }
    ])

    function getData({cursor, limit, ascs, descs, searchCount, ...data}) {
      console.log(cursor, limit, ascs, descs, searchCount, data, '请求参数-=====')
      return Promise.resolve({
        current: cursor,
        total: 400,
        records: [{
          date: '2016-05-02 123213213213213213',
          name: '王小虎1',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎2',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200334
        }, {
          date: '2016-05-01',
          name: '王小虎3',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200335
        }, {
          date: '2016-05-03',
          name: '王小虎4',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200336
        }]
      })
    }

    const tableEvents = {
      cellClick(data: any) {
        console.log(data, 'cell-click')
      }
    }

    return {
      getData,
      tableEvents,
      columnData,
      buttons,
      kdTable
    }
  },
})
</script>

<template>

  <el-card>
    <div class="table-header">
      <template v-for="(item, index) in buttons" :key="index">
        <el-button
          v-if="!item.isHide"
          size="small"
          round
          :type="item.type || 'warning'"
          :icon="item.icon"
          @click="item.callback"
        >
          {{item.label}}
        </el-button>
      </template>
    </div>

    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
      @sort-change="sortChange"
      v-bind="tableProps"
      v-on="tableEvents || {}"
    >
      <el-table-column
        v-for="item in columnData"
        :key="item.columnProps.prop"
        :showOverflowTooltip="true"
        v-bind="item.columnProps"
      >
        <template v-if="item.isTemplate" #default="scope">
          <template v-if="item.templateTag || item.getLabel">
            <component
              :is="item.templateTag || 'span'"
              v-bind="item.templateProps?.(scope.row, scope.$index) || {}"
              v-on="item.templateEvents?.(scope.row, scope.$index) || {}"
              @click="item.callback?.(scope.row, scope.$index)"
            >
              <template v-if="item.subComponent">
                <template v-for="(component, index) in item.subComponent" :key="index">
                  <component
                    :is="component.name"
                    v-bind="component.props"
                    v-on="component.events || {}"
                    @click="component.callback?.(scope.row, scope.$index)"
                  >
                    {{component.label}}
                  </component>
                </template>
              </template>
              <template v-else>
                {{item.getLabel ? item.getLabel?.(scope.row, scope.$index) : scope.row[item.columnProps.prop]}}
              </template>
            </component>
          </template>
          <template v-if="item.buttons">
            <template 
              v-for="btn in item.buttons"
              :key="btn.label">
              <el-button
                type="text"
                size="small"
                v-if="!btn.isHide?.(scope.row, scope.$index)"
                @click="btn.callback(scope.row, scope.$index)"
              >
                {{btn.label}}
              </el-button>
            </template>
          </template>
          <template v-if="item.getVnode">
            <component :is="item.getVnode(scope.row, scope.$index)" />
          </template>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="table-pagination"
      v-if="!hidePagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: "KdTable",
  props: {
    buttons: {
      type: Array,
      default: () => []
    },
    tableProps: {
      type: Object,
      defalut: () => ({})
    },
    tableEvents: {
      type: Object
    },
    columnData: {
      type: Array,
      required: true
    },
    getData: {
      type: Function,
      required: true
    },
    hidePagination: {
      type: Boolean,
      default: false
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  setup(props) {
    const tableData = ref(null)
    const total = ref(100)
    const pageNo = ref(1)
    const _pageSize = ref(props.pageSize)
    const ascending = ref('')
    const descending = ref('')

    onMounted(() => {
      request()
    })

    function request(data?: any) {
      props.getData({
        cursor: pageNo.value,               // 当前页
        limit: _pageSize.value,             // 每页条数
        ascs: ascending.value,              // 升序字段
        descs: descending.value,            // 降序字段
        searchCount: !props.hidePagination, // 是否查询总数
        ...data                             // 外部传入参数
      }).then(res => {
        tableData.value = res.records // 数据
        total.value = res.total       // 总条数
        pageNo.value = res.current    // 当前页码
      })
    }

    function sortChange({column, prop, order}) {
      if (order === 'descending') {
        descending.value = prop || ''
        ascending.value = ''
      } else {
        ascending.value = prop || ''
        descending.value = ''
      }
      request()
    }

    function handleSizeChange(val: number) {
      _pageSize.value = val
      pageNo.value = 1
      request()
    }

    function handleCurrentChange(val: number) {
      pageNo.value = val
      request()
    }

    return {
      total,
      tableData,
      pageNo,
      request,
      handleSizeChange,
      handleCurrentChange,
      sortChange
    }
  },
})
</script>


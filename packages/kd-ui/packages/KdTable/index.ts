import KdTable from './src/index.vue'

/* istanbul ignore next */
KdTable.install = function (app: any) {
  app.component(KdTable.name, KdTable)
}

export { KdTable }

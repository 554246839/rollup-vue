import KdButton from './src/index.vue'

/* istanbul ignore next */
KdButton.install = function (app: any) {
  app.component(KdButton.name, KdButton)
}

export { KdButton }

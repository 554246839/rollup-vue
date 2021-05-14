import Test from './src/Test.vue'

/* istanbul ignore next */
Test.install = function (app) {
  app.component(Test.name, Test)
}

export { Test }

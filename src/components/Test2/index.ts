import Test2 from './src/Test.vue'

/* istanbul ignore next */
Test2.install = function (app) {
  app.component(Test2.name, Test2)
}

export { Test2 }

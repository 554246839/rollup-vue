// Basic
import { Test } from '../packages/Test'
import { Test2 } from './components/Test2'

import { version } from '../package.json'
import { setupGlobalOptions } from './globalConfig'

const components = [
  Test,
  Test2
]

const install = (app, opts = {}) => {
  app.use(setupGlobalOptions(opts))

  components.forEach((component) => {
    app.use(component)
  })

  applyOptions(app)
}

function applyOptions(app) {
  app.config.globalProperties.$test = Test
  app.config.globalProperties.$test2 = Test2
}

const taxreview = {
  version,
  install
}

export {
  Test,
  Test2,
  install
}

export default taxreview

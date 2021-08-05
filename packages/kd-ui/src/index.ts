// Basic
import { KdTable } from '../packages/KdTable'
import { KdButton } from '../packages/KdButton'

import { JsonDialog as kdJsonDialog } from '../packages/KdJsonDialog'

import { version } from '../package.json'
import { setupGlobalOptions } from './globalConfig'

const components = [
  KdTable,
  KdButton
]

const install = (app: any, opts = {}) => {
  app.use(setupGlobalOptions(opts))

  components.forEach((component) => {
    app.use(component)
  })

  applyOptions(app)
}

function applyOptions(app: any) {
  app.config.globalProperties.$kdJsonDialog = kdJsonDialog
}

const kdui = {
  version,
  install
}

export {
  KdTable,
  KdButton,
  kdJsonDialog,
  install
}

export default kdui

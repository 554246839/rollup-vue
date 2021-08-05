import { getCurrentInstance } from 'vue'

/**
 * get globalOptions KDUI config object
 */
export function useGlobalOptions() {
  const instance = getCurrentInstance()

  if (!instance) {
    console.warn('useGlobalOptions must be call in setup function')
    return
  }

  return instance.appContext.config.globalProperties.$KDUI || {}
}

export function setupGlobalOptions(opts: any = {}) {
  return (app) => {
    app.config.globalProperties.$KDUI = {
      size: opts.size || '',
      zIndex: opts.zIndex || 2000
    }
  }
}

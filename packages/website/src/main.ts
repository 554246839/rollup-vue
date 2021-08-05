import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import i18n from './locale'

import KDui from '../../kd-ui/src'
import '../../kd-ui/lib/theme-chalk/index.css'

import ElementUI from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
app.use(Router)
    .use(KDui)
    .use(ElementUI, {
      i18n: i18n.global.t,
    })
    .use(i18n)
    .mount('#app')

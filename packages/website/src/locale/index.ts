import { createI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import hkLocale from 'element-plus/lib/locale/lang/zh-tw'

import EnMessage from './en'
import CnMessage from './zh-cn'
import HkMessage from './zh-hk'

const messages: any = {
  [enLocale.name]: {
    el: enLocale.el,
    ...EnMessage
  },
  [zhLocale.name]: {
    el: zhLocale.el,
    ...CnMessage
  },
  [hkLocale.name]: {
    el: hkLocale.el,
    ...HkMessage
  }
}

type LangType = 'zh-CN' | 'zh-HK' | 'en-US'

type LangMap = {
  [x in LangType]: string
}

const map: LangMap = {
  'zh-CN': zhLocale.name,
  'zh-HK': hkLocale.name,
  'en-US': enLocale.name
}
export default createI18n({
  locale: map[window.localStorage.getItem('headerLang') as LangType || 'zh-CN'],
  fallbackLocale: map['en-US'],
  messages
})

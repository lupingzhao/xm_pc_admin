import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { toLine } from './utils/toLine'
import * as Icons from '@element-plus/icons'
import router from './router'
import store from './store'


import i18n from './language/index';

const app = createApp(App)
// el-icon-xxx
for (let i in Icons) {
  app.component(`el-icon${toLine(i)}`, (Icons as any)[i])
}
// 使用VueNativeSock插件，并进行相关配置
app.use(router)
app.use(store)

app.use(i18n);

// 默认中文
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')


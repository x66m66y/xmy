import { createApp } from 'vue'
import { ElButton, ElDialog, ElDrawer, ElIcon } from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('ElButton', ElButton)
app.component('ElDialog', ElDialog)
app.component('ElDrawer', ElDrawer)
app.component('ElIcon', ElIcon)
app.use(router)
app.mount('#app')

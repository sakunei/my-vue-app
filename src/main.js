import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 引入路由配置

const app = createApp(App)

// 关键步骤：挂载路由
app.use(router)

app.mount('#app')
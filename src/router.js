import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Post from './views/Post.vue'

// 定义路由规则：访问什么网址，显示什么组件
const routes = [
  { path: '/', component: Home },          // 根路径显示首页
  { path: '/post/:id', component: Post }   // /post/1 显示文章页
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
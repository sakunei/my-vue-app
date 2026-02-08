<template>
  <div class="post-container">
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <div class="post-meta">发布时间：{{ post.date }}</div>
      <p class="post-content">{{ post.body }}</p>
    </div>

    <div v-else>
      <h1>😵 文章不存在</h1>
      <p>你好像来到了没有知识的荒原...</p>
    </div>

    <hr />
    <router-link to="/" class="back-btn">← 返回首页</router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// 获取当前的路由信息（包含网址里的 id）
const route = useRoute()

// 模拟的文章数据（以后这些会从服务器获取）
const allPosts = [
  { 
    id: 1, 
    title: '第一篇博客：Hello World', 
    date: '2025-05-20',
    body: '这是我的第一篇博客文章！虽然现在还很简陋，但这是我迈向全栈开发的第一步。Vue 真的挺有趣的！' 
  },
  { 
    id: 2, 
    title: 'Vue 学习笔记', 
    date: '2025-05-21',
    body: '今天学习了路由（Router）的使用。原来单页应用（SPA）跳转页面是不需要刷新浏览器的，体验真丝滑。' 
  },
  {
    id: 3, 
    title: '最近在看的番剧', 
    date: '2025-05-22',
    body: '最近发现几部不错的四月新番，作画非常精良，推荐大家去看看...' 
  }
]

// 核心逻辑：根据网址里的 id，去数组里找对应的文章
// computed 是“计算属性”，它会根据 route.params.id 的变化自动重新计算
const post = computed(() => {
  const id = Number(route.params.id) // 网址里的 id 是字符串，要转成数字
  return allPosts.find(p => p.id === id)
})
</script>

<style scoped>
.post-container {
  max-width: 700px;
  margin: 0 auto; /* 居中显示 */
  padding: 20px;
  
}
.post-content {
  line-height: 1.8; /* 让文字间距舒服一点 */
  color: #333;
}
.post-meta {
  color: #888;
  font-size: 0.9em;
  margin-bottom: 20px;
}
.back-btn {
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  color: #42b883; /* Vue 的标志性绿色 */
}
</style>
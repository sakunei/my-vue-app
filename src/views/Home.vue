<template>
  <div class="home">
    <div class="banner">
      <h1>欢迎来到我的世界 👋</h1>
      <p>这里记录 coding 与二次元的日常</p>
    </div>

    <div class="post-grid">
      <div v-for="post in posts" :key="post.id" class="card">

        <img :src="post.cover" class="card-cover" alt="文章封面">
        <div class="card-body">
          <h3>{{ post.title }}</h3>
          <p class="summary">点击阅读更多关于这篇文章的内容...</p>
          <div class="card-footer">
            <span class="tag">📝 笔记</span>
            <router-link :to="'/post/' + post.id" class="read-btn">
              阅读全文 →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 使用 Picsum 提供的随机图片服务，后面加 ?1, ?2 是为了让每张图不一样
const posts = [
  {
    id: 1,
    title: '第一篇博客：Hello World',
    // 新增的封面图字段
    cover: '#'
  },
  {
    id: 2,
    title: 'Vue 学习笔记：路由与组件',
    cover: '#'
  },
  {
    id: 3,
    title: '最近在看的四月新番推荐',
    cover: '/my-vue-app/public/images/小铃.jpg'
  },
  {
    id: 4,
    title: 'つきがきれい',
    cover: '#'
  }
]
</script>

<style scoped>
.banner {
  text-align: center;
  margin-bottom: 40px;
}
.banner h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}
.banner p {
  color: #666;
}

/* 网格布局：自动适应屏幕 */
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 30px;
}

/* 卡片样式 */
.card {
  background: rgba(255, 255, 255, 0.9); /* 稍微有点透明的白色，效果更好 */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  border: 1px solid #f0f0f0;
}

.card:hover {
  transform: translateY(-5px); /* 鼠标悬停上浮 */
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}



.card-body {
  padding: 20px;
}

.card h3 {
  margin-top: 0;
  font-size: 1.2rem;
  color: #333;
}

.summary {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
}

.card-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag {
  background: #e6f7ff;
  color: #1890ff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.read-btn {
  text-decoration: none;
  color: #ff7875;
  font-weight: bold;
  font-size: 0.9rem;
}

/* 新增的封面图样式 */
.card-cover {
  width: 100%;           /* 宽度撑满卡片 */
  height: 280px;         /* 固定一个合适的高度 */
  object-fit: cover;     /* 关键属性：让图片裁切填充，保持比例不变形 */
  border-bottom: 1px solid #f0f0f0; /* 在图片和文字之间加条淡线 */
}

/* 稍微调整一下卡片内容的内边距 */
.card-body {
  padding: 20px;
}
</style>
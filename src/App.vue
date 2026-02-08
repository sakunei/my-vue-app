<template>
  <div class="app-wrapper">
    <Sidebar />

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
// 引入组件
import Sidebar from './components/Sidebar.vue'
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  
  
  /* ⭐ 设置全屏背景图 ⭐ */
  /* url里面的路径必须对！对应 public/images/bg.jpg */
  background: url('/images/bg.jpg') no-repeat center center fixed; 
  background-size: cover; /* 让图片铺满屏幕 */
  min-height: 100vh;
}

/* 布局调整 */
.main-content {
  /* 关键：给左边留出 300px 的空隙，因为侧边栏宽 300px */
  margin-left: 300px; 
  padding: 40px;
  min-height: 100vh;
  
  /* 为了让文字在背景图上看得清，给主内容加个淡淡的白底 */
  /* 如果你的卡片本身有背景色，这里也可以不用加 */
  /* background: rgba(255, 255, 255, 0.5); */
}

/* 简单的淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
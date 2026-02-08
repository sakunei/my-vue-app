<template>
  <aside class="sidebar glass">
    <div class="profile">
      <div class="avatar-container">
        <img class="avatar" src="/images/avatar.jpg" alt="头像" onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'" />
      </div>
      <h2 class="name">你的名字</h2>
      <p class="bio">Code & Anime & Life</p>
      
      <nav class="nav-links">
        <router-link to="/"> 首页</router-link>
        <router-link to="/about"> 关于</router-link>
      </nav>
    </div>

    <div class="creative-area">
      <div class="player-card flat-mode">
        
        <div class="flat-cover-container">
          <img :src="currentSong.cover" alt="Cover" class="flat-cover-img">
          <div class="playing-overlay" v-if="isPlaying">
             <span></span><span></span><span></span>
          </div>
        </div>

        <div class="flat-right-content">
          <div class="flat-song-info">
            <div class="song-title">{{ currentSong.title }}</div>
            <div class="song-artist">{{ currentSong.artist }}</div>
          </div>

          <div class="progress-bar-wrapper compact">
            <div class="progress-fill" :class="{ 'animating': isPlaying }"></div>
          </div>

          <div class="flat-controls">
            <button @click="prevSong" class="ctrl-btn-mini">⏮</button>
            <button @click="togglePlay" class="ctrl-btn-mini play-btn-mini">
              {{ isPlaying ? '⏸' : '▶' }}
            </button>
            <button @click="nextSong" class="ctrl-btn-mini">⏭</button>
          </div>
        </div>

      </div>
      
      <p class="quote">“技术是为了更好地摸鱼。”</p>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- 🎵 播放器逻辑开始 ---

const isPlaying = ref(false)   // 状态：是否正在播放
const currentSongIndex = ref(0) // 状态：当前是第几首歌

// 歌单数据（你可以随便改）
const playlist = [
  { 
    title: 'Lemon', 
    artist: '米津玄师', 
    cover: '/my-vue-app/images/avatar.jpg' 
  },
  { 
    title: 'Blue Bird', 
    artist: '生物股长', 
    cover: 'https://api.dicebear.com/7.x/identicon/svg?seed=Naruto' 
  },
  { 
    title: 'Unravel', 
    artist: 'TK from 凛', 
    cover: 'https://api.dicebear.com/7.x/identicon/svg?seed=Ghoul' 
  }
]

// 计算属性：自动获取当前歌曲的信息
const currentSong = computed(() => playlist[currentSongIndex.value])

// 切换播放/暂停
const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

// 下一首
const nextSong = () => {
  currentSongIndex.value = (currentSongIndex.value + 1) % playlist.length
  // 切歌的时候，让它保持播放状态
  if (!isPlaying.value) isPlaying.value = true
}

// 上一首
const prevSong = () => {
  currentSongIndex.value = (currentSongIndex.value - 1 + playlist.length) % playlist.length
  if (!isPlaying.value) isPlaying.value = true
}
// --- 🎵 播放器逻辑结束 ---
</script>

<style scoped>
/* --- 布局样式 --- */
.sidebar {
  width: 300px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 让“个人信息”在顶，“播放器”在底 */
  padding: 40px 20px;
  color: white;
  z-index: 100;

  /* 毛玻璃特效 */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
}

.profile { text-align: center; }

/* 头像样式 */
.avatar {
  width: 100px; 
  height: 100px; 
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.5s;
}
.avatar:hover { transform: rotate(360deg); }

.name { margin-top: 15px; font-size: 1.5rem; }
.bio { color: rgba(255, 255, 255, 0.8); font-size: 0.9rem; margin-bottom: 20px; }

.nav-links a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  border-radius: 8px;
  transition: background 0.3s;
}
.nav-links a:hover { background: rgba(255, 255, 255, 0.2); }

/* --- 🎵 扁平化播放器样式 (精修版) --- */
.player-card.flat-mode {
  /* 背景：不再是纯黑，而是带一点渐变的半透明，更有质感 */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  padding: 12px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  /* 强力磨砂效果 */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  /* 边框：上面亮下面暗，制造立体感 */
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /* 柔和的阴影 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.player-card.flat-mode:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
  transform: translateY(-2px); /* 悬停微浮 */
}

/* 左侧方形封面 */
.flat-cover-container {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  position: relative;
  border-radius: 10px; /* 圆角稍微大一点 */
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2); /* 给封面加点投影 */
}

.flat-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

/* 播放时封面微微放大 */
.player-card.flat-mode:hover .flat-cover-img {
  transform: scale(1.1);
}

/* 右侧内容容器 */
.flat-right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  overflow: hidden;
}

/* 歌曲信息 */
.flat-song-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.song-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
  letter-spacing: 0.5px;
}

.song-artist {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

/* 进度条 */
.progress-bar-wrapper.compact {
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.2); /* 深色槽底，对比度更高 */
  border-radius: 4px;
  overflow: hidden;
  margin-top: 4px;
  margin-bottom: 4px;
}

.progress-fill {
  width: 30%; /* 默认给点长度看看效果 */
  height: 100%;
  background: #42b883; /* Vue 绿，也可以改成粉色 #ff7875 */
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(66, 184, 131, 0.5); /* 进度条发光 */
}

/* 底部迷你按钮组 */
.flat-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ctrl-btn-mini {
  background: none;
  border: none;
  outline: none; /* ⭐ 关键：去掉那个丑丑的聚焦框 */
  cursor: pointer;
  padding: 0;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.6);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ctrl-btn-mini:hover {
  color: #fff;
  text-shadow: 0 0 5px rgba(255,255,255,0.5);
}

/* 播放按钮稍微大一点，亮一点 */
.play-btn-mini {
  font-size: 1.4rem;
  color: #fff;
}

/* 律动动画微调 */
.playing-overlay {
  position: absolute; bottom: 0; left: 0; right: 0; top: 0;
  background: rgba(0,0,0,0.3); /* 稍微盖一层黑，让波纹看得清 */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  opacity: 0;
  transition: opacity 0.3s;
}

/* 只有鼠标悬停或者播放时才显示律动遮罩，看你喜好，这里设为播放即显示 */
.flat-cover-container .playing-overlay {
  opacity: 1; 
  background: transparent;
  align-items: flex-end;
  padding-bottom: 4px;
}

.playing-overlay span {
  width: 3px;
  background: #fff;
  border-radius: 2px;
  animation: wave 1s infinite ease-in-out alternate;
  box-shadow: 0 0 4px rgba(0,0,0,0.5);
}
</style>
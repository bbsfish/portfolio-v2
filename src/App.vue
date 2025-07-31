<template>
  <header ref="top">
    <AppHeader />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <AppFooter />
  </footer>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  watch: {
    $route(to) {
      if (to.hash === '#top') {
        this.$refs.top.scrollIntoView({
          behavior: 'smooth',
        });
      }
    },
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  zoom: 1;
  box-sizing: border-box;
}
html, body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  padding: 0;
  margin: 0;
  height: 100%;
  scroll-behavior: smooth;
}
#app {
  display: flex;
  flex-direction: column; // 子要素を縦に並べる
  min-height: 100vh;     // コンテナの高さを最低でも画面の高さにする
}
main {
  margin-top: 60px;
  padding: 0 1rem;
}
footer {
  // このプロパティが残りのスペースを全て埋めるように命令します
  flex-grow: 1; 
  // ここで好きな背景色を指定します
  background-color: #333; // 例：薄い青色
  // フッター内のコンテンツを整えるためのスタイル（任意）
  padding: 1rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
}
</style>

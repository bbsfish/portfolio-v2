<template>
  <header ref="top">
    <AppHeader />
  </header>
  <main>
    <router-view />
    <IconArrowUp v-show="isTopButtonVisible" class="go-top-button" @click="goPageTop" />
  </main>
  <footer>
    <AppFooter />
  </footer>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import IconArrowUp from '@/components/icons/IconArrowUp.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    IconArrowUp,
  },
  data() {
    return {
      prevPageName: 'Home', // 前回ページの名前
      isTopButtonVisible: false, // トップへ戻るボタンの表示設定
      lastScrollY: 0, // 前回のスクロール位置
    };
  },
  methods: {
    handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 100) {
        // ページ上部では常に非表示
        this.isTopButtonVisible = false;
      } else if (currentScrollY < this.lastScrollY) {
        // スクロールアップした場合
        this.isTopButtonVisible = true;
      } else {
        // スクロールダウンした場合
        this.isTopButtonVisible = false;
        if (this.$route.hash === '#top') this.$router.push({ hash: '' });
      }
      this.lastScrollY = currentScrollY;
    },
    goPageTop() {
      this.$refs.top.scrollIntoView({
        behavior: 'smooth',
      });
    },
  },
  watch: {
    $route(to) {
      if (to.name !== this.prevPageName) {
        this.$refs.top.scrollIntoView({
          behavior: 'smooth',
        });
        this.prevPageName = to.name;
      }
      if (to.hash === '#top') {
        this.$refs.top.scrollIntoView({
          behavior: 'smooth',
        });
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style lang="scss">
@use '@/styles/variables.scss' as var;

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
  min-height: 100vh; // コンテナの高さを最低でも画面の高さにする
}
main {
  margin-top: 60px;
  padding: 0 1rem;
}
footer {
  flex-grow: 1; 
  background-color: #333;
  padding: 1rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
}
.go-top-button {
  position: fixed;
  width: 5rem;
  height: 4rem;
  right: 1rem;
  bottom: 1rem;
  background-color: white;
  opacity: 0.6;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    opacity: 1;
  }
  @include var.mq('tab') {
    right: 3rem;
    bottom: 6rem;
  }
}
</style>

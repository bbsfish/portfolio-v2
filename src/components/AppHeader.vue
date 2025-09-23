<template>
  <div class="header" :class="{ 'is-hidden': !isHeaderVisible }">
    <router-link :to="getUrlHash('/')" class="header__logo">My Portfolio</router-link>

    <button @click="toggleMenu" class="header__burger-btn" type="button" aria-label="メニューを開く">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>

    <nav class="nav" :class="{ 'is-open': isMenuOpen }">
      <ul class="nav__list">
        <li class="nav__item"><router-link :to="getUrlHash('/')" class="nav__link" @click="isMenuOpen = false">Home</router-link></li>
        <li class="nav__item"><router-link :to="getUrlHash('/articles')" class="nav__link" @click="isMenuOpen = false">Articles</router-link></li>
        <li class="nav__item"><router-link :to="getUrlHash('/tetris')" class="nav__link" @click="isMenuOpen = false">Tetris</router-link></li>
        <li class="nav__item"><router-link :to="getUrlHash('/contact')" class="nav__link" @click="isMenuOpen = false">Contact</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isMenuOpen: false, // ハンバーガーメニューの開閉状態
      isHeaderVisible: true, // ヘッダーの表示状態
      lastScrollY: 0, // 前回のスクロール位置
    };
  },
  mounted() {
    // スクロールイベントをリッスン
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    // コンポーネント破棄時にイベントリスナーを削除
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    /**
     * ハンバーガーメニューの開閉を切り替えます。
     */
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    /**
     * スクロールを検知してヘッダーの表示を制御します。
     */
    handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 100) {
        // ページ上部では常に表示
        this.isHeaderVisible = true;
      } else if (currentScrollY < this.lastScrollY) {
        // スクロールアップした場合
        this.isHeaderVisible = true;
      } else {
        // スクロールダウンした場合
        this.isHeaderVisible = false;
      }
      this.lastScrollY = currentScrollY;
    },
    getUrlHash(url) {
      if (this.$route.path === url) {
        return `${url}#top`;
      }
      return url;
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as var;

// --- 変数定義 ---
$breakpoint-pc: 768px; // ブレークポイント
$header-height: 60px;   // ヘッダーの高さ
$bg-color: #333;
$nav-bg-color: rgba(0, 0, 0, 0.9);
$font-color: #fff;

// --- 基本のヘッダースタイル ---
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  padding: 0 1rem;
  background-color: $bg-color;
  color: $font-color;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;

  // ヘッダー非表示時のスタイル
  &.is-hidden {
    transform: translateY(-100%);
  }
}

.header__logo {
  font-weight: bold;
  font-size: 1.2rem;
  color: $font-color;
  text-decoration: none;
  z-index: 1001; // メニューが開いてもロゴが最前面に来るように
}

// --- ハンバーガーメニュー（モバイル） ---
.header__burger-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001; // メニューが開いてもボタンが最前面に来るように

  .line {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #fff;
  }
}

// --- ナビゲーションメニュー（モバイル） ---
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: $nav-bg-color;
  // 初期状態では画面外に隠す
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  // メニュー表示時のスタイル
  &.is-open {
    transform: translateX(0);
  }
}
.nav__list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}
.nav__item {
  margin: 2rem 0;
}
.nav__link {
  color: $font-color;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

// --- PC向けスタイル (768px以上) ---
@include var.mq('tab') {
  // ハンバーガーボタンを非表示に
  .header__burger-btn {
    display: none;
  }

  // ナビゲーションメニューをヘッダー内に配置
  .nav {
    position: static;
    height: auto;
    width: auto;
    background-color: transparent;
    transform: none; // transformをリセット
    transition: none; // transitionをリセット
  }
  .nav__list {
    display: flex;
    align-items: center;
  }
  .nav__item {
    margin: 0 0 0 1.5rem;
  }
  .nav__link {
    font-size: 1rem;
    font-weight: normal;
  }
}
</style>
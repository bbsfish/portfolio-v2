<template>
  <div class="app-header" :class="{ pc: isPC, visible: isHeaderVisible }">
    <router-link :to="getUrlHash('/')" class="logo">My Portfolio</router-link>

    <button class="burger-button" type="button" aria-label="メニューを開く" @click="isMenuVisible = !isMenuVisible">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="menu" :class="{ open: isMenuVisible }">
      <ul>
        <li><router-link :to="getUrlHash('/')" @click="isMenuVisible = false">Home</router-link></li>
        <li><router-link :to="getUrlHash('/articles')" @click="isMenuVisible = false">Articles</router-link></li>
        <li><router-link :to="getUrlHash('/contact')" @click="isMenuVisible = false">Contact</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isHeaderVisible: true, // ヘッダーの表示状態
      isPC: false, // PC デバイスかどうか
      isMenuVisible: false, // メニューの表示状態
      headerTop: '0px', // ヘッダーの初期位置
      lastTop: 0, // 最後のヘッダー位置
      scr: 0, // 現在のスクロール位置
      timeout: null, // スクロールイベントのタイムアウトID
    };
  },
  mounted() {
    // スクロールイベントをリッスン
    this.handleResize(); // 初期表示時に画面サイズをチェック
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', () => this.scr = window.scrollY);
  },
  beforeUnmount() {
    // コンポーネント破棄時にイベントリスナーを削除
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', () => this.scr = window.scrollY);
  },
  methods: {
    handleResize() {
			const w = window.innerWidth;
			if (w < 700) this.isPC = false;
			else this.isPC = true;
		},
    getUrlHash(url) {
      if (this.$route.path === url) {
        return `${url}#top`;
      }
      return url;
    },
  },
  watch: {
    scr(to) {
      const delay = 150;
      const headerHeight = 60;
			if (to < this.lastTop) {
				// スクロールアップした場合に実行するもの
				if (this.timeout) clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.isHeaderVisible = true;
					this.isMenuOpen = false;
					this.lastTop = to;
				}, delay);
				if (!this.isHeaderVisible) this.headerTop = String(-1*headerHeight + Math.min(this.lastTop - to, headerHeight)) + 'px';
			}	else {
				// スクロールダウン
				if (this.timeout) clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.isHeaderVisible = false;
					this.isMenuOpen = true;
					this.lastTop = to;
				}, delay);
				if (this.isHeaderVisible) this.headerTop = String(-1*(Math.min(to - this.lastTop, headerHeight))) + 'px';
			}
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as var;

// --- 変数定義 ---
$breakpoint-pc: 768px; // ブレークポイント
$nav-bg-color: rgba(0, 0, 0, 0.9);
$font-color: #fff;

// --- 基本のヘッダースタイル ---
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: v-bind(headerTop);
  left: 0;
  width: 100%;
  height: var.$header-height;
  padding: 0 1rem;
  background-color: #333;
  color: $font-color;
  z-index: 1000;

  &.visible {
    box-shadow: 0 2px 4px var.$shadow-color;
  }
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  color: $font-color;
  text-decoration: none;
  z-index: 1001; // メニューが開いてもロゴが最前面に来るように
}

// --- ハンバーガーメニュー（モバイル） ---
.burger-button {
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

  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #fff;
  }
}

// --- ナビゲーションメニュー（モバイル） ---
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: $nav-bg-color;
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &.open {
    transform: translateY(0);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;

    li {
      margin: 2rem 0;

      a {
        color: $font-color;
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: bold;
      }
    }
  }
}

.app-header.pc {
  .burger-button {
    display: none;
  }

  // ナビゲーションメニューをヘッダー内に配置
  .menu {
    position: static;
    height: auto;
    width: auto;
    background-color: transparent;
    transform: none; // transform をリセット
    transition: none; // transition をリセット

    ul {
      display: flex;
      align-items: center;

      li {
        margin: 0 0 0 1.5rem;

        a {
          font-size: 1rem;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
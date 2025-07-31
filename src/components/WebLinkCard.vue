<template>
  <div class="web-link-card">
    <article>
      <a :href="href" class="link-card" target="_blank">
        <div class="link-card__icon-wrapper">
          <img :src="icon" alt="サイトアイコン" class="link-card__icon-img">
        </div>
        <div class="link-card__content">
          <span class="link-card__name">{{ name }}</span>
          <p class="link-card__description">{{ description }}</p>
        </div>
      </a>
    </article>
  </div>
</template>

<script>
export default {
    name: 'WebLinkCard',
    props: {
      href: {
        type: String,
        default: '#',
      },
      icon: {
        type: String,
        default: '/img/logo.png',
      },
      name: {
        type: String,
        default: 'ポートフォリオ',
      },
      description: {
        type: String,
        default: '細田佳希のポートフォリオサイト',
      },
    },
};
</script>

<style lang="scss" scoped>
$card-border-color: #e0e0e0;
$card-hover-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
$card-text-primary: #212121;
$card-text-secondary: #757575;

.web-link-card {
  margin-bottom: 1rem;
}
.link-card {
  display: flex; // 横並びのレイアウトを有効に
  align-items: center; // 上下中央揃え
  padding: 1rem;
  border: 1px solid $card-border-color;
  border-radius: 0.5rem;
  background-color: #fff;
  text-decoration: none; // aタグのデフォルト下線を消す
  color: inherit; // 親要素の色を継承
  transition: box-shadow 0.2s ease-in-out;

  // カードにマウスが乗った時のスタイル
  &:hover {
    box-shadow: $card-hover-shadow;
  }

  // --- アイコン関連のスタイル ---
  &__icon-wrapper {
    flex-shrink: 0; // コンテナが縮んでもアイコンは縮まないようにする
    margin-right: 1rem;
  }
  &__icon-img {
    display: block; // 画像下の余分な余白を消す
    width: 3rem;    // アイコンの幅
    height: 3rem;   // アイコンの高さ
    border-radius: 0.5rem; // アイコンに少し丸みをつける
  }

  // --- コンテンツ関連のスタイル ---
  &__content {
    display: flex;
    flex-direction: column; // 子要素を縦に並べる
    justify-content: center; // 上下に配置するための中央揃え
    min-width: 0; // flexアイテムがはみ出るのを防ぐおまじない
  }
  &__name {
    font-size: 1rem;
    font-weight: bold;
    color: $card-text-primary;
    margin: 0 0 0.25rem 0; // 下に少し余白
  }
  &__description {
    font-size: 0.875rem;
    color: $card-text-secondary;
    margin: 0;

    // テキストが長い場合に省略する設定 (任意)
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
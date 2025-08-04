<template>
  <div class="zenn-article-cards">
    <article class="ArticleCard_container" v-for="(article, i) of articles" :key="i">
      <a class="ArticleCard_mainLink" :href="getZennURL(article.path)">
        <div class="ArticleCard_emojiContainer">
          <span class="Emoji_nativeEmoji">{{ article.emoji }}</span>
        </div>
        <div class="ArticleCard_titleContainer">
          <h3 class="ArticleCard_title">{{ article.title }}</h3>
        </div>
        <div class="ArticleCard_meta">
          <div class="ArticleCard_dateAndLikes">
            <time :datetime="article.published_at">{{ article.days_ago }}日前</time>
          </div>
        </div>
      </a>
    </article>
  </div>
</template>

<script>
import { getJSON } from '@/lib/fetch-api.js';

export default {
	name: 'ZennArticleCards',
	props: {
		limit: {
			type: Number,
			default: 3,
		},
	},
  emits: ['onload'],
	data() {
    return {
      articles: [],
    };
  },
	methods: {
    getZennURL(path) {
      return 'https://zenn.dev' + path;
    },
    async getArticles(limit) {
      const data = await getJSON('/zenn/api/articles?username=bbsfish');
      if (data === null) return [];
      let { articles } = data;
      // 記事の時間情報を付与して、大きい順に並べ替える
      articles = articles.map((e) => {
				e.published_timestamp = new Date(e.published_at).getTime();
        return e;
      });
      articles.sort((a, b) => a.timestamp - b.timestamp);
      // 大きいものから limit まで切り出す
      articles = articles.slice(0, limit);
			// articles のそれぞれの要素に days_ago を追加する
      for (let i = 0; i < articles.length; i++) {
        const { title, emoji, published_at, published_timestamp, path, article_type } = articles[i];
				// 公開日時が何日前かを表す days_ago を作る
				const currentTimestamp = new Date().getTime();
				const difference = currentTimestamp - published_timestamp;
				const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));
        articles[i] = { title, emoji, published_at, path, days_ago: daysAgo };
      }
      return articles;
    },
  },
  async mounted() {
    const obj = await this.getArticles(this.limit);
    if (obj !== null) this.articles = obj;
    this.$emit('onload');
  },
}
</script>

<style lang="scss" scoped>
$card-hover-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

// ArticleCardコンテナ全体のスタイル
.ArticleCard_container {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s ease-in-out;

  // メインリンクのスタイル
  .ArticleCard_mainLink {
    text-decoration: none;
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%; // 要素全体の高さをいっぱいにする
  }

  // 絵文字コンテナのスタイル
  .ArticleCard_emojiContainer {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  // タイトルコンテナのスタイル
  .ArticleCard_titleContainer {
    margin-bottom: 0.5rem;

    .ArticleCard_title {
      font-size: 1rem;
      margin: 0;
    }
  }

  // メタ情報のスタイル
  .ArticleCard_meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: #666;

    // 日付といいね数のスタイル
    .ArticleCard_dateAndLikes {
      display: flex;
      align-items: center;

      // 日付のスタイル
      time {
        margin-right: 0.5rem;
        color: #999;
      }
    }
  }

  // ホバー時のスタイル
  &:hover {
    box-shadow: $card-hover-shadow;
  }
}
</style>

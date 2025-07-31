<template>
  <div class="articles-view">
    <h1>Zenn の投稿記事一覧</h1>
    <loading v-model:active="isZennArticlesLoading" :is-full-page="true" loader="dots" color="#333" />
    <ZennArticleCards v-show="!isZennArticlesLoading" :limit="50" @onload="isZennArticlesLoading = false" />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import ZennArticleCards from '@/components/ZennArticleCards.vue';

export default {
  name: 'ArticlesView',
  components: {
    ZennArticleCards,
    Loading,
  },
  data() {
    return {
      isZennArticlesLoading: true,
    };
  },
  head() {
    return {
      title: this.$route.meta.title,
      meta: [
        { 
          name: 'description',
          content: this.$route.meta.description ,
        },
        {
          property: 'og:title',
          content: this.$route.meta.og_title,
        },
        {
          property: 'og:description',
          content: this.$route.meta.og_description,
        }
      ]
    };
  },
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as var;

.articles-view {
  margin: 0 auto;
  @include var.mq('tab') {
    width: 60%;
  }
  section {
    img {
      width: 100%;
      max-width: 40rem;
    }
  }
}
</style>

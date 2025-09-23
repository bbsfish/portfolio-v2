import { createRouter, createWebHistory } from 'vue-router';
import TetrisView from '@/views/TetrisView.vue';
import ArticlesView from '@/views/ArticlesView.vue';
import ContactView from '@/views/ContactView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/tetris',
      name: 'Tetris',
      component: TetrisView,
      meta: {
        title: 'Zenn掲載記事一覧',
        description: `
          このウェブサイトは、bbsfishがZennに投稿した技術記事の一覧ページ。
          内容はJavaScript、NodeJS、Google Apps Script、Vue.js、Docker、各種API（LINE、Gmail、Gemini）の活用法など、
          フロントエンドからバックエンドまで多岐にわたるウェブ開発技術を網羅している。`,
        og_title: '細田佳希によるZenn掲載記事一覧',
        og_description: 'bbsfishがZennで公開した技術記事一覧。JavaScript、Node.js、GAS、API連携など、Web開発に関する実践的なTIPSを多数掲載している。'
      },
    },
    {
      path: '/articles',
      name: 'Articles',
      component: ArticlesView,
      meta: {
        title: 'Zenn掲載記事一覧',
        description: `
          このウェブサイトは、bbsfishがZennに投稿した技術記事の一覧ページ。
          内容はJavaScript、NodeJS、Google Apps Script、Vue.js、Docker、各種API（LINE、Gmail、Gemini）の活用法など、
          フロントエンドからバックエンドまで多岐にわたるウェブ開発技術を網羅している。`,
        og_title: '細田佳希によるZenn掲載記事一覧',
        og_description: 'bbsfishがZennで公開した技術記事一覧。JavaScript、Node.js、GAS、API連携など、Web開発に関する実践的なTIPSを多数掲載している。'
      },
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactView,
      meta: {
        title: 'お問い合わせ',
        description: `
          細田佳希のポートフォリオサイト。
          JavaScriptやHTML/CSS、PHPといった長年の経験を持つプログラミングスキルや、GCP、Firebase、Dockerなどの多彩なツール知識を基に、
          専門知識なしで更新可能なアーティスト向けサイト、File System Access APIなどを駆使して個人情報をローカルで安全に管理するSSOアプリケーション、
          LINEと連携してクレジットカードの利用状況を記録・管理するWebアプリケーションといった複数の開発プロジェクトを紹介するとともに、
          Zennでの技術記事やGitHubでのコード公開も行っているウェブサイトです。`,
        og_title: '細田佳希へのお問い合わせ',
        og_description: 'ポートフォリオサイトのお問い合わせフォーム'
      },
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: '細田佳希のポートフォリオ',
        description: `
          細田佳希のポートフォリオサイト。
          JavaScriptやHTML/CSS、PHPといった長年の経験を持つプログラミングスキルや、GCP、Firebase、Dockerなどの多彩なツール知識を基に、
          専門知識なしで更新可能なアーティスト向けサイト、File System Access APIなどを駆使して個人情報をローカルで安全に管理するSSOアプリケーション、
          LINEと連携してクレジットカードの利用状況を記録・管理するWebアプリケーションといった複数の開発プロジェクトを紹介するとともに、
          Zennでの技術記事やGitHubでのコード公開も行っているウェブサイトです。`,
        og_title: '細田佳希のポートフォリオ',
        og_description: '細田佳希のポートフォリオサイト。JavaScriptやGCP等の技術を活かし、LINE連携アプリやローカルで情報を扱うSSOといったWebアプリケーションの開発実績、Zennでの技術記事などを掲載している。'
      },
    },
  ],
});

export default router;

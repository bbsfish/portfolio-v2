<template>
  <div class="home-view">
    <div id="keyvisual">
      <img src="/img/me.png" alt="プロフィール写真" />
      <div class="kv-hello">
        <div>
          <p>こんにちは</p>
          <p>細田佳希のポートフォリオです</p>
        </div>
      </div>
    </div>
    <nav>
      <ol>
        <li><a href="#articles">記事</a></li>
        <li><a href="#skills">スキル</a></li>
        <li><a href="#devs">作ったもの</a></li>
        <li><a href="#weblink">ウェブリンク</a></li>
      </ol>
    </nav>


    <h1 id="articles">記事</h1>
    <section>
      <ZennArticleCards :limit="3" />
      <router-link to="/articles" class="AllArticlesButton">すべて表示</router-link>
    </section>


    <h1 id="skills">スキル</h1>
    <section>
      <h2>プログラミング</h2>
      <ol>
        <li>JavaScript (6年間)</li>
        <li>HTML/CSS (6年間)</li>
        <li>PHP (3年間)</li>
        <li>Python (１年未満)</li>
        <li>C/C++ (１年未満)</li>
      </ol>
      <h2>その他、プラットフォーム・ツールなど</h2>
      <ul>
        <li>Git/GitHub</li>
        <li>GCP (Compute Engine, App Engine, Firebase 等)</li>
        <li>Google App Script</li>
        <li>Docker</li>
        <li>ウェブサーバ (Apache2)</li>
        <li>メールサーバ (Postfix)</li>
      </ul>
    </section>


    <h1 id="devs">作ったもの</h1>
    <section>
      <h2>アーティスト向けポートフォリオサイト: <a href="https://panmryofficial.vercel.app/">こちら</a></h2>
      <img src="/img/sharkbrown.html.xdomain.jp.png" alt="アーティスト向けポートフォリオサイトのサイトイメージ" />
      <h3>概要</h3>
      <p>
        アーティストである友人が制作したインディーズゲームの作品を紹介する、ポートフォリオサイトを構築しました。
        本サイトには、アーティストのプロフィール紹介、作品ギャラリー、新着情報の掲載機能があります。
        最大の特長は、専門知識がない方でも簡単にコンテンツを更新できる点です。
        CMS（コンテンツ管理システム）を導入し、HTMLを直接編集することなく、手軽に作品の追加や情報の更新を行えるよう設計しました。
      </p>
      <h3>実装のポイント</h3>
      <p>本サイトはRESTful APIをベースに設計・実装されています。</p>
      <h4>CMS：低コストで運用可能なCockpit</h4>
      <p>
        CMSには、PHPサーバーで動作するオープンソースのヘッドレスCMS「<a href="https://getcockpit.com/" target="_blank" rel="noopener noreferrer">Cockpit</a>」を採用しました。
        これにより、サーバー費用を抑えつつ、柔軟なコンテンツ管理を実現しています。
      </p>
      <h4>フロントエンド：AstroによるSSR（サーバーサイドレンダリング）</h4>
      <p>
        フロントエンドには「<a href="https://astro.build/" target="_blank" rel="noopener noreferrer">Astro</a>」を使用しています。
        当初は静的サイトとしての利用を想定していましたが、CMSによる動的なコンテンツ更新の要件を満たすため、最終的にSSR（サーバーサイドレンダリング）モードで動作させています。
        デプロイには「<a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">Vercel</a>」を利用し、GitHubリポジトリと連携したCI/CD環境を構築しています。
      </p>
      <h4>UX改善：作品ギャラリーの遅延読み込み</h4>
      <p>
        作品ギャラリーの画像は、ページの初期表示速度を最適化するため、クライアントサイドで遅延読み込みさせています。
        最初に表示する作品数を制限し、「Watch More」ボタンがクリックされるたびに非同期で追加の作品を読み込む仕組みです。
        これにより、軽快なユーザー体験を損なうことなく、多くの作品を掲載できます。
      </p>

      <h2>個人情報をローカルで取り扱うSSOアプリケーション: <a href="https://hashed-potato-v3.vercel.app/#/" target="_blank" rel="noopener noreferrer">こちら</a></h2>
      <img src="/img/hashed-potato-dev.png" alt="個人情報をローカルで取り扱うSSOアプリケーションのスクリーンショット" />
      <h3>コンセプト：ローカル中心の新しいSSO</h3>
      <p>
        Webサービスが急増する現代において、ユーザーは多数のアカウント管理を強いられています。
        既存のシングルサインオン（SSO）はクラウドベースのものが主流ですが、本プロジェクトでは個人情報をローカル環境で安全に取り扱う、新しいSSOの仕組みを考案・開発しました。
        これは、各種Web APIを組み合わせることで実現可能です。
      </p>
      <h3>フロントエンド：PWAとして実装</h3>
      <p>
        アプリケーションは、フロントエンドフレームワーク「<a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">Vue.js</a>」を用いてPWA（プログレッシブウェブアプリ）として構築されています。Vue.jsで生成した静的ファイルをGitHub Pagesで公開しています。主な機能は以下のAPIを活用して実装しました。
      </p>
      <ul>
        <li><strong>ローカルファイルの操作：</strong><a href="https://developer.chrome.com/docs/capabilities/web-apis/file-system-access?hl=ja" target="_blank" rel="noopener noreferrer">File System Access API</a> を使用し、ローカルファイルの作成や読み書きを実現。</li>
        <li><strong>セキュリティ：</strong>ファイル内容の暗号化と復号には、標準技術である <a href="https://developer.mozilla.org/ja/docs/Web/API/Web_Crypto_API" target="_blank" rel="noopener noreferrer">Web Crypto API</a> を利用し、安全性を確保しています。</li>
      </ul>
      <h3>バックエンド：エージェントサーバー</h3>
      <p>
        認証情報を仲介するエージェントサーバーは、当初Express.jsで構築していました。現在は開発フェーズとして、Firebase (Cloud Firestore) と Google Apps Script (GAS) を用いて、HTTPリクエストを処理する簡易的なシステムを運用しています。
      </p>

      <h2>LINEで手軽に記録、クレジットカード決済管理アプリ</h2>
      <div class="image-gallery">
        <div class="image-gallery-inner">
          <figure>
            <img src="/img/ly.cf067016.cloudfree.jp.png" alt="決済の手動登録画面" />
            <figcaption>決済の手動登録画面</figcaption>
          </figure>
          <figure>
            <img src="/img/ly.cf067016.cloudfree.jp_2.png" alt="決済記録の確認画面" />
            <figcaption>決済記録の確認画面</figcaption>
          </figure>
          <figure>
            <img src="/img/ly.cf067016.cloudfree.jp_3.jpg" alt="LINEでの決済通知画面" />
            <figcaption>LINEでの決済通知</figcaption>
          </figure>
        </div>
      </div>
      <h3>概要</h3>
      <p>
        クレジットカードの利用状況を、毎日使うLINEアプリから手軽に記録・管理できるWebアプリケーションです。カード会社からの利用通知メールをトリガーにLINEで決済内容を通知。ユーザーはチャット画面から支出を記録でき、使いすぎの防止や家計管理の手間を大幅に削減します。
      </p>
      <h3>主な機能</h3>
      <ul>
        <li>
          <strong>LINE連携による自動通知・登録:</strong><br>
          カード会社から届く利用通知メールを検知し、即座にLINEへ通知します。受け取ったユーザーは、そのままLINE上で支出情報を登録できます。
        </li>
        <li>
          <strong>Webダッシュボード:</strong><br>
          記録した決済情報は専用のWebページで一覧表示・確認が可能です。月ごとの集計やデータの絞り込みにも対応しています。
        </li>
        <li>
          <strong>手動登録機能:</strong><br>
          通知が届かなかった決済や、過去の支出もWeb上のフォームから簡単に追加登録できます。
        </li>
      </ul>
      <h3>このアプリで解決できること</h3>
      <p>
        「カードを使うたびに家計簿アプリを開くのが面倒」「いつの間にかカードを使いすぎてしまう」といった課題を、最も身近なコミュニケーションツールであるLINEを活用することで解決。簡単・確実に支出を把握し、スマートな家計管理をサポートします。
      </p>
    </section>


    <h1 id="weblink">ウェブリンク</h1>
    <nav>
      <WebLinkCard name="GitHub" href="https://github.com/bbsfish" description="bbsfish has many repositories available. Follow their code on GitHub."
        icon="https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg" />
      <WebLinkCard name="Zenn" href="https://zenn.dev/bbsfish" description="フロントエンド、バックエンド、いろいろ勉強中です"
        icon="https://static.zenn.studio/images/logo-transparent.png" />
    </nav>
  </div>
</template>

<script>
import ZennArticleCards from '@/components/ZennArticleCards.vue';
import WebLinkCard from '@/components/WebLinkCard.vue';

export default {
  name: "HomeView",
  components: {
    ZennArticleCards,
    WebLinkCard,
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
};
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as var;

.home-view {
  margin: 0 auto;
  @include var.mq('tab') {
    width: 60%;
  }
  h1 {
    border-bottom: 1px solid #333;
  }
  section {
    img {
      width: 100%;
      max-width: 40rem;
    }
  }
}
#keyvisual {
  text-align: center;
  margin: 5rem 0;
  img {
    height: 10rem;
  }
  @include var.mq('tab') {
    display: flex;
    justify-content: center;
    .kv-hello {
      display: flex;
      align-items: center;
      height: 10rem;
    }
  }
}
.image-gallery {
  overflow-x: scroll;
  .image-gallery-inner {
    width: 1000px;
    height: 600px;
    display: flex;
  }
}
</style>
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: "src/main.js",
      title: "細田佳希のポートフォリオ"
    }
  },
  devServer: {
    proxy: {
      // '/api' で始まるリクエストをプロキシの対象にする
      '/zenn': {
        // 転送先のURL
        target: 'https://zenn.dev',
        // オリジンを転送先に偽装する
        changeOrigin: true,
        // パスから '/api' を取り除く
        pathRewrite: { '^/zenn': '' },
      },
    },
  },
});

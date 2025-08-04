const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: '細田佳希のポートフォリオ'
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
    }
  },
  devServer: {
    proxy: {
      '/zenn': {
        target: 'https://zenn.dev',
        changeOrigin: true,
        pathRewrite: { '^/zenn': '' },
      },
    },
  },
});

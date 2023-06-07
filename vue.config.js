const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8529,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        // 允许跨域
        changeOrigin: true,
        // 重写
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
})

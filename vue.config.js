const path = require('path')
const defaultSettings = require('./src/settings.js')

const name = defaultSettings.title || 'vue Element Admin'

const port = process.env.port || process.env.npm_config_port || 9527 // dev port

function resolve(dir){
    // __dirname项目根目录的绝对路径
    return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js'),
    proxy: {
      '/dc-api': {
        //  将 /dc-api 替换成 跨域地址
        target: 'http://172.21.11.132:18080/default/api/biz/rest',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/dc-api': ''
        }
      },
      '/api': {
        //  将/api 替换
        target: 'http://localhost:8080',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
      name: name,
      resolve:{
          alias:{
              '@': resolve('src')
          }
      }
  },
  
  //引入svg图标
  chainWebpack(config){
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}

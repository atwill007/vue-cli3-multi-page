const fs = require('fs')
const path = require('path')

let pages = {}

const files = fs.readdirSync(resolve('./src/views')).filter(item => !/^_.*/.test(item))
files.forEach(file => {
  pages[file] = {
    entry: `src/views/${file}/`,
    title: file,
    template: 'public/index.html',
    filename: `${file}.html`,
    chunks: ['chunk-vendors', 'chunk-common', file]
  }
})

module.exports = {
  pages,
  lintOnSave: true,
  devServer: {
    port: 9025,
    compress: true, // 开启压缩
    proxy: {
      '/search': {
        target: 'https://api.github.com',
        ws: true,
        changeOrigin: true
      },
      '/api/v2': {
        target: 'http://app.jason.alpha.dev1.kaolalicai.cn'
      },
      '/activity/api': {
        target: 'http://app.jason.alpha.dev1.kaolalicai.cn'
      }
    }
  }
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

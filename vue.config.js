const fs = require('fs')
const path = require('path')

let pages = {}

const files = fs.readdirSync(path.resolve(__dirname, './src/views'))
files.forEach(file => {
  pages[file] = {
    entry: `src/views/${file}/`,
    template: 'public/index.html',
    filename: `${file}.html`,
    chunks: ['chunk-vendors', 'chunk-common', file]
  }
})

module.exports = {
  pages,
  lintOnSave: true,
  devServer: {
    proxy: {
      '/search': {
        target: 'https://api.github.com',
        ws: true,
        changeOrigin: true
      }
    }
  }
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

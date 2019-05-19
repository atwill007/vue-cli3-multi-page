// generateComponent.js`
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const { vueTemplate, entryTemplate } = require('./template')

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

log('请输入要生成的页面英文名称')

let componentName = ''
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString()
  const dir = resolve('../src/views', inputName)
  const vueFile = resolve(dir, 'main.vue')
  const entryFile = resolve(dir, 'index.ts')

  const hasComponentDirectory = fs.existsSync(dir)
  if (hasComponentDirectory) {
    errorLog(`${inputName}目录已存在，请重新输入`)
    return
  } else {
    log(`正在生成 views 目录 ${dir}`)
    await dotExistDirectoryCreate(dir)
  }
  try {
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/')
      componentName = inputArr[inputArr.length - 1]
    } else {
      componentName = inputName
    }
    log(`正在生成 vue 文件 ${vueFile}`)
    await generateFile(vueFile, vueTemplate(componentName))
    log(`正在生成 entry 文件 ${entryFile}`)
    await generateFile(entryFile, entryTemplate(inputName))
    successLog('生成成功')
  } catch (e) {
    errorLog(e.message)
  }

  process.stdin.emit('end')
})

process.stdin.on('end', () => {
  log('exit')
  process.exit()
})

function dotExistDirectoryCreate (directory) {
  return new Promise((resolve) => {
    mkdirs(directory, () => {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs (directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), () => {
      fs.mkdirSync(directory)
      callback()
    })
  }
}

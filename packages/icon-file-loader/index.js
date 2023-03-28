#!/usr/bin/env node

const { program } = require('commander')
const { glob } = require('glob')
const path = require('path')
const ora = require('ora')
const fs = require('fs')

program
  .name('loader')
  .description('Icon file loader')
  .version(require('./package').version)

program
  .command('load-icon-file')
  .description('load icon file')
  .action(async () => {
    const spinner = ora({
      text: 'Task in progress...',
      color: 'green',
    }).start()

    const files = await glob(
      path.join(__dirname, './node_modules/@sicons/**/*.svg')
    )

    if (files && files.length) {
      const jsonData = {}

      files.reverse().forEach((file) => {
        const data = fs.readFileSync(file).toString()
        jsonData[extractFileName(file) + '__' + extractFolderName(file)] = data
      })

      const p = path.join(
        __dirname,
        '../vue3-icon-picker/src/assets/icons.json'
      )

      fs.writeFileSync(p, JSON.stringify(jsonData, undefined, 2))

      spinner.succeed('Success ! File loaded at : ' + p)
    } else spinner.fail('No data found !')
  })

program.action(() => {
  program.help()
})

program.parse(process.argv)

function extractFileName(path) {
  const name = path.replace(/^\.\/(.*)\.\w+$/, '$1')
  const parts = name.split('/')

  return parts[parts.length - 1]?.split('.')[0] || ''
}

function extractFolderName(path) {
  const name = path.replace(/^\.\/(.*)\.\w+$/, '$1')
  const parts = name.split('/')

  return parts[parts.length - 2] || ''
}

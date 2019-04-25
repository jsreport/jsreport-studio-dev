#!/usr/bin/env node
const path = require('path')
const argsParser = require('yargs-parser')
const webpack = require('webpack')
const extensionBuildConfig = require('../extensionBuildConfig')

const argv = argsParser(process.argv.slice(2), {
  boolean: ['disable-chunks-info'],
  string: ['config']
})

let config

if (argv.config) {
  console.log(`using custom webpack config at: ${argv.config}`)

  try {
    config = require(path.resolve(process.cwd(), argv.config))
  } catch (e) {
    throw new Error(`Error while trying to use config in ${argv.config}: ${e.message}`)
  }
} else {
  config = extensionBuildConfig
}

webpack(config, (err, stats) => {
  if (err) {
    console.error(err)
    return process.exit(1)
  }

  var jsonStats = stats.toJson()

  if (jsonStats.warnings.length > 0) {
    console.error(jsonStats.warnings)
  }

  if (jsonStats.errors.length > 0) {
    console.error(jsonStats.errors)
    process.exit(1)
  }

  console.log(stats.toString({
    colors: true,
    chunks: argv.disableChunksInfo === true ? false : true,
    cached: false
  }))

  console.log('webpack build  ok')
})

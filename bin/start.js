#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var execSync = require('child_process').execSync

console.log('Checking if jsreport installed')
try {
  fs.statSync(path.join(process.cwd(), 'node_modules', 'jsreport'))
} catch (e) {
  console.log('Installing the latest jsreport, this takes few minutes')
  execSync('npm install jsreport', { stdio: [0, 1, 2] })
}

function tryRequire (module) {
  try {
    return fs.statSync(module)
  } catch (e) {
    return false
  }
}

function installStudio (p) {
  console.log('Installing jsreport-studio dev dependencies at ' + p)
  return execSync('npm install', { stdio: [0, 1, 2], cwd: p })
}

function installStudioIfRequired (p) {
  var packageJson
  try {
    packageJson = JSON.parse(fs.readFileSync(path.join(p, 'package.json'), 'utf8'))
  } catch (e) {
    return
  }

  for (var k in packageJson.devDependencies) {
    if (!tryRequire(path.join(p, 'node_modules', k))) {
      // somehow npm install failes on EBUSY error if this field is not deleted
      delete packageJson._requiredBy
      fs.writeFileSync(path.join(p, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf8')
      return installStudio(p)
    }
  }
}

console.log('Making sure jsreport-studio has dev dependencies installed')
installStudioIfRequired(path.join(process.cwd(), 'node_modules', 'jsreport', 'node_modules', 'jsreport-studio'))
installStudioIfRequired(path.join(process.cwd(), 'node_modules', 'jsreport-studio'))

console.log('Starting...')

process.env.NODE_ENV = 'jsreport-development'
var jsreport = require(path.join(process.cwd(), 'node_modules', 'jsreport'))
jsreport().init().catch(function (e) {
  console.error(e)
})

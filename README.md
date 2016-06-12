# jsreport-studio-dev

[![Build Status](https://travis-ci.org/jsreport/jsreport-studio-dev.png?branch=master)](https://travis-ci.org/jsreport/jsreport-studio-dev)
[![NPM Version](http://img.shields.io/npm/v/jsreport-studio-dev.svg?style=flat-square)](https://npmjs.com/package/jsreport-studio-dev)

> **Utils for developing jsreport studio extensions**

## Building studio extension

The package exposes `jsreport-studio-build` command which should be run from the main extension directory. It automatically locates `studio/main_dev.js` and build it. The most common approach is to run it from the `package.json`  `prepublish` script.

```js
"scripts": {  
    "prepublish": "jsreport-studio-build"
}
```

Note the command automatically skip running during `npm install`. This means you should include built `main.js` in the npm.

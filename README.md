# jsreport-studio-dev

[![NPM Version](http://img.shields.io/npm/v/jsreport-studio-dev.svg?style=flat-square)](https://npmjs.com/package/jsreport-studio-dev)

> **Utils for developing jsreport studio extensions**

## Building studio extension

The package exposes `jsreport-studio-build` command which should be run from the main extension directory. It automatically locates `studio/main_dev.js` and build it. The most common approach is to run it from the `package.json`  `prepublish` script. It's also recommended to additionally install and use [in-publish](https://github.com/iarna/in-publish) module to assure the `jsreport-studio-build` does run only during npm publish.

```js
"scripts": {  
    "prepublish": "in-publish && jsreport-studio-build || not-in-publish"
}
```



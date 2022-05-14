# to-zip-webpack-plugin
这个 webpack 插件 可以自动对webpack output.path进行zip/rar压缩,并且可以自定义压缩源、压缩日志


安装

```bash
npm i --save-dev to-zip-webpack-plugin
```

<h2 align="center">使用</h2>

**webpack.config.js**
```js
const ToZipWebpackPlugin = require('to-zip-webpack-plugin')
module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new ToZipWebpackPlugin()
  ]
}
```
支持零配置，


```js

```

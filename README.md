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
支持零配置，默认对webpack打包完成后的出口资源配置output.path进行压缩到path同级目录。

同时支持多个参数：
```js
    plugins: [
      new ToZipWebpackPlugin({
        deleteFileList: ["./last.zip", "/dist"], //在output打包完成后删除deleteFileList中的文件夹或目录
        format: "zip", //要压缩的格式 支持zip、tar
        fileName: "test", //压缩文件名
        defaultFileName: "uuid", //当不设置fileName 时会自动生成文件名，支持uuid  timestrap time
        archive: {
          //自定义压缩源/目标，设置archive时以下参数必填
          source: __dirname + "/other.config-test.js", //要压缩的文件/目录的路径
          targetDir: __dirname, //压缩文件最终的输出目录
          fileName: "bundlejs", //压缩的文件名
        },
        log: true, //是否记录压缩操作日志到当前目录ToZipWebpackPlugin.log
        zlibLevel: 9, //设置压缩等级
      }),
    ]
```
内部压缩操作发生在webpack compiler引擎afterEmit钩子
hook详情：https://webpack.docschina.org/api/compiler-hooks/#afteremit

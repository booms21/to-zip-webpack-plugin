# to-zip-webpack-plugin
一个简单易用的 `webpack` 压缩插件，在打包后可以自动对`webpack`配置的`output.path`进行`zip/rar`压缩,并且可以自定义压缩源、生成压缩日志、自动生成多种类型的唯一文件名


<h2 align="center">安装</h2>

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
支持零配置，默认对webpack打包完成后output.path进行压缩到path同级目录。

<h2 align="center">例子</h2>
同时支持多个可选参数：
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
打包后看到控制台以下输出说明压缩完成：
```
Compression finish ！ -  /Users/wsp/vuetest/bundlejs.zip  Size: 0.00M
Compression finish ！ -  /Users/wsp/vuetest/497bfd78-7da6-45ab-97b3-0d126981bfcd.zip  Size: 0.21M
```
内部压缩操作发生在webpack compiler引擎afterEmit钩子
hook详情：https://webpack.docschina.org/api/compiler-hooks/#afteremit

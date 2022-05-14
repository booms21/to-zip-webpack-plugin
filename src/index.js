const TimeFormatter = require("datetime-fmt");
const { v4 } = require("node-uuid");
const del = require("del");
const { isString, isArray } = require("./util");
const doArchive = require("./doArchive");
const outputArchive = require("./outputArchive");
class ToZipWebpackPlugin {
  constructor({
    zlibLevel,
    format,
    fileName,
    defaultFileName,
    source,
    log,
    deleteFileList,
    archive,
  } = {}) {
    const FILETYPE = ["zip", "tar"]; //支持的压缩文件类型
    this.options = {};
    this.timeFormatter = new TimeFormatter();
    this.options.zlibLevel = isNaN(zlibLevel) ? 9 : zlibLevel; //默认压缩等级为9
    this.options.format = FILETYPE.includes(format) ? format : "zip"; //默认类型为zip
    this.options.fileName = isString(fileName)
      ? fileName
      : this.getFileName("time"); //默认文件名为时间字符串
    isString(defaultFileName)
      ? (this.options.fileName =
          this.getFileName(defaultFileName) || this.options.fileName)
      : this.options.fileName;
    this.options.source = isString(source) ? source : "";
    this.options.deleteFileList = deleteFileList;
    this.options.archive = archive;
    this.options.log = log;
  }
  delete(deleteFileList) {
    return del(deleteFileList);
  }

  getFileName(type) {
    const typeTable = {
      timestamp: String(this.timeFormatter.getTimestamp()),
      time: this.timeFormatter.getDateStr("yyyymmddhhMMss"),
      uuid: v4(),
    };
    return typeTable[type];
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync(
      "ToZipWebpackPlugin",
      (complition, callback) => {
        this.options.archive && doArchive(this.options); //压缩前的压缩操作
        outputArchive(this.options, complition.options.output.path);
        isArray(this.options.deleteFileList) &&
          this.delete(this.options.deleteFileList);
        callback();
      }
    );
  }
}

module.exports = ToZipWebpackPlugin;

const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const { isString, logger } = require("./util");
const doArchive = (options) => {
  if (isString(options.archive.source) && isString(options.archive.targetDir)) {
    const abPath = path.join(
      options.archive.targetDir,
      "/",
      options.archive.fileName + "." + options.format
    ); //目标压缩路径
    const output = fs.createWriteStream(abPath);

    //设置压缩格式
    const archive = archiver(options.format, {
      zlib: { level: options.zlibLevel }, // Sets the compression level.
    });
    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on("warning", function (err) {
      options.log && logger(err);
      if (err.code === "ENOENT") {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });
    archive.on("error", function (err) {
      options.log && logger(err);
      throw err;
    });

    archive.on("finish", () => {
      const msg =
        "Compression finish ！ -  " +
        abPath +
        "  Size: " +
        (archive.pointer() / 1024 / 1024).toFixed(2) +
        "M";
      console.log(msg);
      options.log && logger(msg);
    });

    archive.pipe(output);

    if (fs.lstatSync(options.archive.source).isFile()) {
      const strum = fs.createReadStream(options.archive.source);
      archive.append(strum, { name: path.basename(options.archive.source) });
    } else {
      archive.directory(path.relative(__dirname, options.archive.source)); //压缩源为目录时转为相对路径
    }
    archive.finalize(); //压缩完成
  }
};
module.exports = doArchive;

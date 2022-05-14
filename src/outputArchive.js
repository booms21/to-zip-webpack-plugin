const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const { logger } = require("./util");
const outputArchive = (options, outputPath) => {
  const filename = options.fileName;
  const abPath = path.join(outputPath, "/", filename + "." + options.format);
  const sourceDir = path.join(path.relative(path.resolve(), outputPath));
  const output = fs.createWriteStream(path.relative(outputPath, abPath));
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
      path.join(path.resolve(), path.relative(outputPath, abPath)) +
      "  Size: " +
      (archive.pointer() / 1024 / 1024).toFixed(2) +
      "M";
    console.log(msg);
    options.log && logger(msg);
  });

  archive.pipe(output);
  archive.directory(sourceDir);
  archive.finalize(); //压缩完成
};
module.exports = outputArchive;

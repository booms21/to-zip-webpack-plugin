const log4js = require("log4js");

const isUndefined = (val) => {
  return typeof val === "undefined";
};
const isString = (str) => {
  return typeof str === "string";
};

const isArray = (arr) => {
  return Object.prototype.toString.call(arr) === "[object Array]";
};

const logger = (msg) => {
  log4js.configure({
    appenders: {
      ToZipWebpackPlugin: { type: "file", filename: "ToZipWebpackPlugin.log" },
    },
    categories: {
      default: { appenders: ["ToZipWebpackPlugin"], level: "info" },
    },
  });

  const logger = log4js.getLogger("ToZipWebpackPlugin");
  logger.info(msg);
};

module.exports = { isUndefined, isString, isArray, logger };

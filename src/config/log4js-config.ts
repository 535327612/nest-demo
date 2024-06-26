import { Configuration } from 'log4js';
import { resolve } from 'path';

const baseLogPath = resolve(__dirname, '../../logs'); //日志要写入哪个目录

const log4jsConfig: Configuration = {
  appenders: {
    console: {
      type: 'console', //打印到控制台
    },
    access: {
      type: 'dateFile', //会写入文件，并且按照日期分类
      filename: `${baseLogPath}/access/access.log`, //日志文件名，会命名为：access.当前时间.log
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd', //文件名时间格式
      numBackups: 3,
      keepFileExt: true, //是否保留文件后缀
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      //日志文件按日期切割
      pattern: 'yyyyMMdd',
      numBackups: 3,
      keepFileExt: true,
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      //日志文件按日期切割
      pattern: 'yyyyMMdd',
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG',
    },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
};

export default log4jsConfig;

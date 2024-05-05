import { Request, Response } from 'express';
import { Logger } from '../logger';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: () => void,
) {
  const code = res.statusCode; // 响应状态码
  next();

  // 组装日志信息
  const logFormat = `Request original url: ${req.originalUrl}
 Method: ${req.method}
 IP: ${req.ip}
 Status code: ${code}
 Parmas: ${JSON.stringify(req.params)}
 Query: ${JSON.stringify(req.query)}
 Body: ${JSON.stringify(req.body)}`;

  // 根据状态码进行日志分类
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}

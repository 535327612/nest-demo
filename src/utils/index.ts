import * as crypto from 'crypto';

export const calculateMD5 = (msg: string) => {
  return crypto.createHash('md5').update(msg).digest('hex');
};

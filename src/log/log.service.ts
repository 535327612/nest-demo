import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class LogService {
  create() {
    return 'This action adds a new log';
  }

  error() {
    throw new HttpException('错误', 500);
  }

  success(id: number) {
    return `This action returns a #${id} log`;
  }

  update(id: number) {
    return `This action updates a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}

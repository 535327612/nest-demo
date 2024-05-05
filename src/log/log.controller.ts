import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { LogService } from './log.service';
import { Public } from '@/commom/decorators';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  create() {
    return this.logService.create();
  }

  @Get('error')
  @Public()
  error() {
    return this.logService.error();
  }

  @Get('public-success')
  @Public()
  publicSuccess() {
    return this.logService.success(1);
  }

  @Get('success')
  success(@Param('id') id: string) {
    return this.logService.success(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.logService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logService.remove(+id);
  }
}

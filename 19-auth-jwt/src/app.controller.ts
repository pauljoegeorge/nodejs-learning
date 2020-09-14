import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { JsLogger } from './js-logger/js-logger.service';
import { Mylogger } from './js-logger/js-logger.service';
import { loggers } from 'winston';
var winston = require('winston');

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private logger: JsLogger,
  ) {
    this.logger.setContext(AppController.name)
  }

  @Get()
  getHello(): string{
    this.logger.log("invoked getHello AppController method")
    return  this.appService.getHello();
  }
}

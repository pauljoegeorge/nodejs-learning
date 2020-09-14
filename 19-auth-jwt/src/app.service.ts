import { Injectable } from '@nestjs/common';
import { JsLogger, Mylogger } from './js-logger/js-logger.service';

@Injectable()
export class AppService {
  constructor(
    private logger: JsLogger
  ){
    this.logger.setContext(AppService.name)
  }

  getHello(): string {
    this.logger.log("invoked getHello AppService method")
    return 'Hello World!';
  }
}

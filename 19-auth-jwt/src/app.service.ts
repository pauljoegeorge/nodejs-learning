import { Injectable, Inject } from '@nestjs/common';
import { JsLogger } from './js-logger/js-logger.service';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AppService {
  constructor(
    private logger: JsLogger,
    @Inject(REQUEST) private request,
  ){
    this.logger.setContext(AppService.name)
    this.logger.setRequestId(this.request.headers.requestid);
  }

  getHello(): string {
    this.logger.log("invoked getHello AppService method")
    return 'Hello World!';
  }
}

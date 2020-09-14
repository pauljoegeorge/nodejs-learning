import { Module } from '@nestjs/common';
import { JsLogger } from './js-logger.service';

@Module({
  providers: [JsLogger],
  exports: [JsLogger],
})
export class LoggerModule {}
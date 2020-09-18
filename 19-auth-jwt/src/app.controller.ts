import { Controller, Get, Inject} from '@nestjs/common';
import { AppService } from './app.service';
import { JsLogger } from './js-logger/js-logger.service';
import { RequestIdValidationDto } from './dtos/request-id-validation.dto';
import { GetRequestId } from './get-reqid.decorator';
import { HeaderValidationPipe } from './pipes/header-validation.pipe';
import { REQUEST } from '@nestjs/core';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: JsLogger,
    @Inject(REQUEST) private request,
  ) {
    this.logger.setContext(AppController.name)
    this.logger.setRequestId(this.request.headers.requestid);
  }

  @Get()
  getHello(
    @GetRequestId(HeaderValidationPipe) requestIdValidationDto: RequestIdValidationDto,
  ): string {
    const { requestid } = requestIdValidationDto
    console.log(requestid);
    this.logger.log("invoked getHello AppController method")
    return  this.appService.getHello();
  }
}

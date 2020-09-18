import { Injectable, Logger, Scope, LoggerService, Optional } from '@nestjs/common';
import { LoggerMiddleware } from './js-logger.middleware';
const { createLogger, format, transports} = require('winston');
const { combine, timestamp, label, printf } = format;

@Injectable({ scope: Scope.TRANSIENT })
export class JsLogger extends Logger {
    constructor( 
        @Optional() protected requestId?: string,
    ) {
        super()
    }
  
    setRequestId(reqId: string){
        this.requestId = reqId;
    }

    getRequestId(): string{
        return this.requestId;
    }

    log(message: string) {
        if(this.context){
            Mylogger.info({message, "context": `${this.context}`, "requestId": `${this.requestId}`})
        }
        else{
            Logger.log(message);
        }
    }
  
    error(message: string, trace: string) {
        Mylogger.error({message, "context": `${this.context}`, "requestId": `${this.requestId}`})
    }
  
    warn(message: string) {
        Mylogger.warn({message, "context": `${this.context}`, "requestId": `${this.requestId}`})
    }
  
    debug(message: string) {
        Mylogger.debug({message, "context": `${this.context}`, "requestId": `${this.requestId}`})
    }
  
    verbose(message: string) {
        Mylogger.verbose({message, "context": `${this.context}`, "requestId": `${this.requestId}`})
    }
  }


// const myFormat = printf(({ level, label, message, context, timestamp }) => {
    // return `{context: ${JSON.stringify(context)}, message: ${JSON.stringify(message)}}`
// });
  
export const Mylogger = createLogger({
    // format: combine(
    //     format.colorize(),
    //     timestamp(),
    //     // myFormat,
    // ),
    transports: [new transports.Console()]

});
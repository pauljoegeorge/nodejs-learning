import { Injectable, Logger, Scope, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { AppController } from 'src/app.controller';
const { createLogger, format, transports} = require('winston');
const { combine, timestamp, label, printf } = format;

@Injectable({ scope: Scope.TRANSIENT })
export class JsLogger extends Logger {
    constructor() {
        super()
    }
  
    log(message: string) {
        if(this.context){
            Mylogger.info({"message":`${message}`, "context": `${this.context}`})
        }else{
            Logger.log(message);
        }
    }
  
    error(message: string, trace: string) {
        Mylogger.error({"message":`${message}`, "context": `${this.context}`})
    }
  
    warn(message: string) {
        Mylogger.warn({"message":`${message}`, "context": `${this.context}`})
    }
  
    debug(message: string) {
        Mylogger.debug({"message":`${message}`, "context": `${this.context}`})
    }
  
    verbose(message: string) {
        Mylogger.verbose({"message":`${message}`, "context": `${this.context}`})
    }
  }


const myFormat = printf(({ level, label, message, context, timestamp }) => {
    return `[${level}]: {context: ${JSON.stringify(context)}, message: ${JSON.stringify(message)}}`
});
  
export const Mylogger = createLogger({
    format: combine(
        format.colorize(),
        timestamp(),
        myFormat,
    ),
    transports: [new transports.Console()]

});
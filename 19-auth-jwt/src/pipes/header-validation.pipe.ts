import { PipeTransform, ArgumentMetadata, BadRequestException, Optional, ExecutionContext, CanActivate, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class HeaderValidationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata){
    //    console.log('value', value);
    //    console.log('metadata', metadata);
       if(value.requestid.length < 6){
           throw new BadRequestException(`Invalid RequestID: minimum length should be 6`)
       }
       return value;
    }
}
import { PipeTransform, ArgumentMetadata, BadRequestException, Optional, ExecutionContext, CanActivate, Injectable } from "@nestjs/common";

@Injectable()
export class AuthencationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata){
       try{
           // throw error when userIDs of URL params and token not matching
           if(value.params.id != value.user.userId){
               throw new BadRequestException();
           }
       }catch(error){
           throw new BadRequestException(error.message);
       }
       return value;
    }
}
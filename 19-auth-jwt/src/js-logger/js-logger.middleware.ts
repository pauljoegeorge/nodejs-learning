import { Injectable, NestMiddleware, Optional, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Request, Response, request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  
    use(req: Request, res: Response, next: Function) {
        try{
            if(req.headers.requestid.length < 6){
                throw new BadRequestException(`requestId: Minimum length should be 6`);
            }
        }
        catch(error){
            throw new BadRequestException(`requestId: Minimum length should be 6`);
        }
        next();
    }

}

// this file is not necessary //

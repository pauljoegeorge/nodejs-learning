import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { request } from "express";

export const Authentication = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    // console.log(`data: ${data}`);
    // console.log(`ctx: ${ctx}`);
    return req;
});
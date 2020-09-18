import { createParamDecorator, ExecutionContext, Param, BadRequestException } from "@nestjs/common";
import { request } from "http";
import { validateOrReject, validate } from "class-validator";

export const GetRequestId = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers;
});
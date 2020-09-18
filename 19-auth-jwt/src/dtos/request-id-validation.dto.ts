import { IsString, MinLength, MaxLength, IsNotEmpty } from "class-validator";

export class RequestIdValidationDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    requestid: string;
}
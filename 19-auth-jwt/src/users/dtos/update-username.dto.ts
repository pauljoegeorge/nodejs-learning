import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class UpdateUsernameDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username: string;
}
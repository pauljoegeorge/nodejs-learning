import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsOptional } from "class-validator";

export class CreateUserDto {

    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password_confirmation: string;
}
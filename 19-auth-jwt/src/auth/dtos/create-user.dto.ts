import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsOptional, isNotEmpty, isEnum, IsEnum, IsEmail } from "class-validator";
import { UserTypeEnum } from "src/users/user-type.enum";

export class CreateUserDto {

    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(UserTypeEnum, {message: "userType: wrong input"})
    userType: UserTypeEnum;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @IsEmail()
    // @Matches(
    //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.([a-zA-Z0-9-]+)*$/,
    //     {message: "Invalid email"},
    // )
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
import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, IsIn, IsNumberString, Matches, IsEnum } from "class-validator";
import { In } from "typeorm";
import { Address } from "../address.entity";
import { AddressType } from "../address-type.enum";

export class SaveAddressDto {

    @IsString()
    @IsNotEmpty()
    // @IsIn([AddressType.HOME, AddressType.OFFICE])
    @IsEnum(AddressType, {message: "Wrong address type"})
    type: AddressType;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    city: string;

    @IsNumberString()
    @IsNotEmpty()
    @Matches(/^\d{7}$/, {message: "wrong zip code"})
    zipCode: number;
}
import { Controller, Patch, Req, UseGuards, Body, UsePipes, ValidationPipe, Get, Post } from "@nestjs/common";
import { UsersService, User } from "./users.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateUsernameDto } from "./dtos/update-username.dto";
import { SaveAddressDto } from "src/address/dtos/save-address-dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UsersService,
        private readonly updateUsernameDto: UpdateUsernameDto,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Req() req): Promise<User> {
        return this.userService.getUserInfo(req.user.email);
    }  

    @UseGuards(JwtAuthGuard)
    @Patch('/me')
    @UsePipes(ValidationPipe)
    updateUserName(
        @Req() req,
        @Body() updateUsernameDto: UpdateUsernameDto,
    ): Promise<{}>{
        return this.userService.updateUserName(req.user.email, updateUsernameDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/address')
    @UsePipes(ValidationPipe)
    saveAddress(
        @Req() req,
        @Body() saveAddressDto: SaveAddressDto,
    ): Promise<{}>{
        return this.userService.saveAddress(req.user.email, saveAddressDto);
    }
}
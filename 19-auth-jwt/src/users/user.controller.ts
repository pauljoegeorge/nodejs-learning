import { Controller, Patch, Req, UseGuards, Body, UsePipes, ValidationPipe, Get, Post, Param, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { UsersService, User } from "./users.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateUsernameDto } from "./dtos/update-username.dto";
import { SaveAddressDto } from "src/address/dtos/save-address-dto";
import { Address } from "src/address/address.entity";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UsersService,
        private readonly updateUsernameDto: UpdateUsernameDto,
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
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
    @Post('/:id/address')
    @UsePipes(ValidationPipe)
    saveAddress(
        @Req() req,
        @Body() saveAddressDto: SaveAddressDto,
        @Param('id', ParseIntPipe) userId: number, 
    ): Promise<{}>{
        return this.userService.saveAddress(req.user.email, userId, saveAddressDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id/address')
    @UsePipes(ValidationPipe)
    getAddreesses(
        @Req() req,
        @Param('id', ParseIntPipe) userId: number, 
    ): Promise<Address[]>{
        return this.userService.getAddresses(req.user.email, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id/address/:addressId')
    @UsePipes(ValidationPipe)
    getAddreessById(
        @Req() req,
        @Param('id', ParseIntPipe) userId: number,
        @Param('addressId', ParseIntPipe) addressId: number, 
    ): Promise<Address>{
        return this.userService.getAddressById(req.user.email, userId, addressId);
    }

}
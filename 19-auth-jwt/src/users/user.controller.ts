import { Controller, Post, Patch, Req, UseGuards, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AuthRepository } from "src/auth/auth.repository";
import { UpdateUsernameDto } from "./dtos/update-username.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UsersService,
        private readonly updateUsernameDto: UpdateUsernameDto,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Patch('/me')
    @UsePipes(ValidationPipe)
    updateUserName(
        @Req() req,
        @Body() updateUsernameDto: UpdateUsernameDto,
    ): Promise<{}>{
        return this.userService.updateUserName(req.user.email, updateUsernameDto);
    }
}
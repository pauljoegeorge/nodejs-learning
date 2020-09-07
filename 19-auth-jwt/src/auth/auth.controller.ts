import { Controller, UseGuards, Post, Get, Req, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{}> {
        return this.authService.createUser(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req): Promise<{}> {
        return this.authService.login(req.user);
    }
}

import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Get('/:id')
    findById(@Param('id') id: string): string {
        return this.userService.findById(id);
    }
}

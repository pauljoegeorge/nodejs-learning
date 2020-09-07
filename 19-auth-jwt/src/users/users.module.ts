import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from 'src/auth/auth.repository';
import { UserController } from './user.controller';
import { UpdateUsernameDto } from './dtos/update-username.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
  ],
  providers: [UsersService, UpdateUsernameDto],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}

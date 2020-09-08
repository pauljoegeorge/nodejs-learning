import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UpdateUsernameDto } from './dtos/update-username.dto';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UsersService, UpdateUsernameDto],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUsernameDto } from './dtos/update-username.dto';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { JwtPayloadInterface } from 'src/auth/jwt-payload.interface';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}


  async updateUserName(email: string, updateUsernameDto: UpdateUsernameDto){
    const currentUser = await this.userRepository.findOne({ email });
    if(currentUser){
      const { username } = updateUsernameDto
      currentUser.username =  username 
      try{
        await currentUser.save();
        console.log(JSON.stringify(currentUser));
        return {id: currentUser.id, username: currentUser.username, email: currentUser.email}
      }
      catch(error){
        console.log(error.detail);
      }
    }
    else{
      throw new NotFoundException();
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<JwtPayloadInterface>{
    const payload = await this.userRepository.createUser(createUserDto);
    return payload
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }
}

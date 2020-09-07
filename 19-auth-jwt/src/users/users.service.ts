import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthRepository } from 'src/auth/auth.repository';
import { strict } from 'assert';
import { UpdateUsernameDto } from './dtos/update-username.dto';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: AuthRepository,
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
}

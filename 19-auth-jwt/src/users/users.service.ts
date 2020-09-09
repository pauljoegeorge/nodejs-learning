import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateUsernameDto } from './dtos/update-username.dto';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { JwtPayloadInterface } from 'src/auth/jwt-payload.interface';
import { Address } from 'src/address/address.entity';
import { SaveAddressDto } from 'src/address/dtos/save-address-dto';

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
        return {id: currentUser.id, username: currentUser.username, email: currentUser.email, address: currentUser.addresses}
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

  async saveAddress(email, saveAddressDto): Promise<{}>{
    const user = await this.userRepository.findOne({ email });
    if(user){
      return await this.saveAddressToDb(user.id, saveAddressDto);
    }else{
      throw new NotFoundException();
    }
  }

  async getUserInfo(email: string): Promise<User>{
    const user = await this.findUserByEmail(email);
    if(!user){
      throw new NotFoundException()
    }else{
      return user;
    }
  }

  private async  saveAddressToDb(user_id: number, saveAddressDto: SaveAddressDto): Promise<{}>{
    const { type, street, city, zipCode } = saveAddressDto;
    const address = new Address()
    address.type = type
    address.street = street
    address.city = city
    address.zipCode = zipCode
    address.userId = user_id
    try{
      await address.save();
      return address
    }
    catch(error){
      throw new BadRequestException(error);
    }
  }
}

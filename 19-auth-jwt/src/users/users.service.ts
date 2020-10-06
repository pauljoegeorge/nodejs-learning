import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UpdateUsernameDto } from './dtos/update-username.dto';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { JwtPayloadInterface } from 'src/auth/jwt-payload.interface';
import { Address } from '../address/address.entity';
import { SaveAddressDto } from 'src/address/dtos/save-address-dto';
import { AddressService } from '../address/address.service';
import { add } from 'winston';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly addressService: AddressService,
  ) {}


  async updateUserName(email: string, updateUsernameDto: UpdateUsernameDto){
    const currentUser = await this.userRepository.findOne({ email });
    if(currentUser){
      const { username } = updateUsernameDto
      currentUser.username =  username 
      try{
        await this.userRepository.save(currentUser);
        //  currentUser.save();
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

  async saveAddress(email: string, userId: number, saveAddressDto: SaveAddressDto): Promise<any>{
    const user = await this.userRepository.findOne({ email });
    if(user && user.id === userId){
      return await this.saveAddressToDb(user.id, saveAddressDto);
    }else{
      throw new UnauthorizedException();
    }
  }

  async deleteAddress(email: string, userId: number, addressId: number): Promise<void>{
    const user = await this.findUserByEmail(email);
    const address = await this.addressService.findAddressById(addressId);
    if(!address){
      throw new UnauthorizedException();
    }
    await this.addressService.deleteAddressById(addressId, user.id);
  }

  async getUserInfo(email: string): Promise<User>{
    const user = await this.findUserByEmail(email);
    if(!user){
      // confuse user
      throw new NotFoundException()
    }else{
      return user;
    }
  }

  async getAddresses(email:string, paramUserId: number): Promise<Address[]>{
    const user = await this.getUserInfo(email)
      return user.addresses;
  }


  async getAddressById(email:string, paramUserId: number, addressId: number): Promise<Address>{
    const currentUser = await this.getUserInfo(email)
    const address = currentUser.addresses.filter(address => address.id === addressId)
    if(address.length === 0){
      throw new UnauthorizedException();
    }
    return address;
  }

  private async  saveAddressToDb(user_id: number, saveAddressDto: SaveAddressDto): Promise<{}>{
    const { type, street, city, zipCode } = saveAddressDto;
    const address = Address.create()
    address.type = type
    address.street = street
    address.city = city
    address.zipCode = zipCode
    // address.userId = user_id
    address.testUserId2 = user_id
    try{
      await address.save();
      return address
    }
    catch(error){
      throw new BadRequestException(error);
    }
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { throws } from 'assert';
import { Address } from './address.entity';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
    constructor(
        private readonly addressRepository: AddressRepository,
      ) {}

    async findAddressById(id: number): Promise<Address>{
        const address = await this.addressRepository.findOne({id});
        if(!address){
            throw new NotFoundException();
        }
        return address;
    }

    async deleteAddressById(id: number, userId: number){
        try{
            await this.addressRepository.delete({id, testUserId2: userId});
        }catch(error){
            throw new BadRequestException(`${error}`);
        }
    }
}

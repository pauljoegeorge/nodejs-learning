import { Test } from '@nestjs/testing'
import { AddressType } from '../address/address-type.enum';
import { SaveAddressDto } from 'src/address/dtos/save-address-dto';
import { AddressRepository } from '../address/address.repository';
import { AddressService } from '../address/address.service';
import { UpdateUsernameDto } from './dtos/update-username.dto';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { UserTypeEnum } from './user-type.enum';
import { Address } from '../address/address.entity';
import { AddressModule } from 'src/address/address.module';


let mockAddress = {id: 1, type: AddressType.HOME, street: "Taisho", city: "Matsue", zipCode: 6900000};
const mockRepository = () => ({
    findOne: jest.fn(),
    save: jest.fn(),
    createUser: jest.fn(),
});

const mockAddressRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
});
describe('UserService', () => {
    let userService;
    let userRepository;
    let addressRepository;
    let addressService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AddressService,                
                UsersService,
                {provide: UserRepository, useFactory: mockRepository},
                {provide: AddressRepository, useFactory: mockAddressRepository},
            ],
        }).compile();
        userService =  await module.get<UsersService>(UsersService);
        addressService =  await module.get<AddressService>(AddressService);
        userRepository = await module.get<UserRepository>(UserRepository);
        addressRepository = module.get<AddressRepository>(AddressRepository);
    });

    describe('update username', () => {
        it('when valid user doesnt exists', () => {
            let invalidMockUser = {id: 1, username: "abcd123", email: "abcdefg@gmail.com"};
            const updateUsernameDto: UpdateUsernameDto = { username: "username"};
            userRepository.findOne.mockResolvedValue(false)

            // call service method to update username
            const res = userService.updateUserName(invalidMockUser.email, updateUsernameDto);
            
            expect(userRepository.findOne).toHaveBeenCalled();
            expect(userRepository.findOne).toHaveBeenCalledWith({email: invalidMockUser.email})
            expect(res).rejects.toThrow(new NotFoundException);


        });

        it('when valid user exists', async() => {
            let validMockUser = {id: 1, username: "abcd123", email: "abcdefg@gmail.com"};
            const updateUsernameDto: UpdateUsernameDto = { username: "username"};
            userRepository.findOne.mockResolvedValue(validMockUser);
            userRepository.save.mockResolvedValue(true);

            // call service method to update username
            const res = userService.updateUserName(validMockUser.email, updateUsernameDto);

            expect(userRepository.findOne).toHaveBeenCalled();
            expect(userRepository.findOne).toHaveBeenCalledWith({email: validMockUser.email});
            const mockUser = await userRepository.findOne(validMockUser.email);
            expect(mockUser).toBe(validMockUser);
            expect(userRepository.save).toHaveBeenCalled();
            expect(userRepository.save).toHaveBeenCalledWith(mockUser);
            expect(mockUser.username).toBe("username");

        });

        it('when valid user but save fails', async() => {
            let validMockUser = {id: 1, username: "abcd123", email: "abcdefg@gmail.com"};
            const updateUsernameDto: UpdateUsernameDto = { username: ""};
            userRepository.findOne.mockResolvedValue(validMockUser);
            userRepository.save.mockResolvedValue(false);

            // call service method to update username
            const res = userService.updateUserName(validMockUser.email, updateUsernameDto);

            expect(userRepository.findOne).toHaveBeenCalled();
            expect(userRepository.findOne).toHaveBeenCalledWith({email: validMockUser.email});
            const mockUser = await userRepository.findOne(validMockUser.email);
            expect(mockUser).toBe(validMockUser);
            expect(userRepository.save).toHaveBeenCalled();
            expect(userRepository.save).toHaveBeenCalledWith(mockUser);
            expect(userRepository.save).rejects;
            expect(mockUser.username).toBe(validMockUser.username);
            
        });
    });

    describe('cerate a new user', () => {
        it('with credentials', () => {
            const createUserDto: CreateUserDto = { username: "abcd123", email: "abcdefg@gmail.com", userType: UserTypeEnum.ADMIN, password: "abcd1234", password_confirmation: "abcd1234"};
            userRepository.createUser.mockResolvedValue(true);
            userService.createUser(createUserDto);
            expect(userRepository.createUser).toHaveBeenCalled();
        });
    });

    describe('find user by email', () => {
        it('when valid user', async() => {
            let validMockUser = {id: 1, username: "abcd123", email: "abcdefg@gmail.com"};
            userRepository.findOne.mockResolvedValue(validMockUser);

            userService.findUserByEmail(validMockUser.email);
            expect(userRepository.findOne).toHaveBeenCalledWith({email: validMockUser.email});
        });

    });
    
    describe('save address', () => {
        let mockUser;
        let saveAddressDto: SaveAddressDto = mockAddress;
        mockUser = {id: 1, username: "abcd123", email: "abcdefg@gmail.com"};

        // it('when invalid user', async() => {
            
        //     userRepository.findOne.mockResolvedValue(mockUser);

        //     userService.saveAddress(mockUser.email, 5, saveAddressDto);
        //     expect(userRepository.findOne).toHaveBeenCalledWith({ email: mockUser.email});
        //     expect(userService.saveAddress(mockUser.email, 5, saveAddressDto)).rejects.toThrow(new UnauthorizedException());
        // });

        it('when valid user', async() => {
            const save = jest.fn().mockResolvedValue(true);
            // Address.create  = jest.fn().mockResolvedValue({ save})
            // addressRepository.create = jest.fn().mockReturnValue({save});
            userService.saveAddressToDb = jest.fn().mockResolvedValue({
                userId: mockUser.id,
                saveAddressDto: saveAddressDto,
                save,
            });

            userRepository.findOne.mockResolvedValue(mockUser);
            // userService.saveAddressToDb.mockResolvedValue("abcd");

            await userService.saveAddress(mockUser.email, 1, saveAddressDto);
            expect(userRepository.findOne).toHaveBeenCalledWith({ email: mockUser.email});
            expect(userService.saveAddressToDb).toHaveBeenCalled();
            // expect(Address.create).toHaveBeenCalled();
            

        });

        it('when valid user but invalid address', async() => {
            const invalidMockAddress = {id: 1, type: AddressType.HOME, street: "Taisho", city: "Matsue", zipCode: 69000};
            let invalidAddressDto: SaveAddressDto = invalidMockAddress;
            const save = jest.fn().mockRejectedValue(false);
            userService.saveAddressToDb = jest.fn().mockResolvedValue({
                userId: mockUser.id,
                saveAddressDto: invalidAddressDto,
                save,
            });
            userRepository.findOne.mockResolvedValue(mockUser);
            await userService.saveAddress(mockUser.email, 1, invalidAddressDto);
            expect(userService.saveAddressToDb).toHaveBeenCalled();
            // expect(userService.saveAddressToDb).rejects.toThrow();  ==== not done ============
        });

    });

    describe('delete address', () => {
        const mockUser = {id: 1, username: "abcd123", email: "abcdefg@gmail.com"};
        it('when true', async() => {
            userService.findUserByEmail = jest.fn().mockResolvedValue(mockUser);
            addressService.findAddressById = jest.fn().mockResolvedValue(mockAddress);
            userService.deleteAddress(mockUser.email, mockUser.id, 1);
            expect(userService.findUserByEmail).toHaveBeenCalled();
            expect(addressService.findAddressById).toHaveBeenCalled();
        });
    });
    

});
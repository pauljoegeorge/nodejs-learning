import { Test } from '@nestjs/testing'
import { JsLogger } from '../js-logger/js-logger.service';
import { UsersService } from './users.service';


const mockService = () => ({
    getUserInfo: jest.fn(),
    updateUserName: jest.fn(),
    saveAddress: jest.fn(),
    getAddresses: jest.fn(),
    getAddressById: jest.fn(),
    deleteAddress: jest.fn(),
});

let mockUser = {id: 1, username: "abcd123", email: "abcdefg@gmail.com"};
let mockAddress = {id: 1, type: "office", street: "Taisho", city: "Matsue", zipCode: "6900000"}
describe('UserController', () => {
    let userService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {provide: UsersService, useFactory: mockService},
                JsLogger,
            ]
        }).compile();
        userService = await module.get<UsersService>(UsersService);
    });

    it('should get profile', async() => {
        userService.getUserInfo.mockResolvedValue(mockUser);

        expect(userService.getUserInfo).not.toHaveBeenCalled();
        const response = await userService.getUserInfo(mockUser.email);
        expect(userService.getUserInfo).toHaveBeenCalledWith(mockUser.email);
        expect(response).toEqual(mockUser);
    });

    it('update username', async() => {
        userService.updateUserName.mockResolvedValue(mockUser);
        
        expect(userService.updateUserName).not.toHaveBeenCalled();
        const response = await userService.updateUserName(mockUser.email, mockUser.username);
        expect(userService.updateUserName).toHaveBeenCalledWith(mockUser.email, mockUser.username);
        expect(response).toEqual(mockUser);
    })

    it('save user address', async() => {
        userService.saveAddress.mockResolvedValue(mockAddress);
        expect(userService.saveAddress).not.toHaveBeenCalled();
        const response = await userService.saveAddress(mockUser.email, mockUser.id, {mockAddress});
        expect(userService.saveAddress).toHaveBeenCalledWith(mockUser.email, mockUser.id, {mockAddress});
        expect(response).toEqual(mockAddress);
    })

    it('get user address', async() => {
        userService.getAddresses.mockResolvedValue(mockAddress);
        expect(userService.getAddresses).not.toHaveBeenCalled();
        const response = await userService.getAddresses(mockUser.email, mockUser.id);
        expect(userService.getAddresses).toHaveBeenCalledWith(mockUser.email, mockUser.id);
        expect(response).toEqual(mockAddress);
    })

    it('get user address by address id', async() => {
        userService.getAddressById.mockResolvedValue(mockAddress);
        expect(userService.getAddressById).not.toHaveBeenCalled();
        const response = await userService.getAddressById(mockUser.email, mockUser.id, mockAddress.id);
        expect(userService.getAddressById).toHaveBeenCalledWith(mockUser.email, mockUser.id, mockAddress.id);
        expect(response).toEqual(mockAddress);
    });

    it('delete address by address id', async() => {
        userService.deleteAddress.mockResolvedValue(mockAddress);
        expect(userService.deleteAddress).not.toHaveBeenCalled();
        const response = await userService.deleteAddress(mockUser.email, mockUser.id, mockAddress.id);
        expect(userService.deleteAddress).toHaveBeenCalledWith(mockUser.email, mockUser.id, mockAddress.id);
        expect(response).toEqual(mockAddress);
    });

});
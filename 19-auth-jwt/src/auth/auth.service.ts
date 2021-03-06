import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtPayloadInterface } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    
    if(user && await user.validPassword(pass)){
      return user
    }else{
      throw new UnauthorizedException(`Invalid Credentials`);
    }

  }

  async login(user: any): Promise<{}> {
    const payload: JwtPayloadInterface = { userId: user.id, email: user.email };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async createUser(createUserDto: CreateUserDto): Promise<{}> {
    const payload = await this.usersService.createUser(createUserDto);
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}

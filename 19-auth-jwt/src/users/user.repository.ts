import { EntityRepository, Repository } from "typeorm";
import { User } from "../users/user.entity";
import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "../auth/dtos/create-user.dto";
import { JwtPayloadInterface } from "../auth/jwt-payload.interface";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async createUser(createUserDto: CreateUserDto): Promise<JwtPayloadInterface> {
        const { username, userType, email, password, password_confirmation } = createUserDto
        
        // throw exception if not matching
        if(password !== password_confirmation){
            throw new BadRequestException("password and password confirmation doesn't match");
        }
        
        // register new user
        const user = new User();
        user.userType = userType;
        user.username = username;
        user.email = email;
        user.password_salt = await bcrypt.genSalt(); // generate password salt
        user.password = await this.hashedPassword(password, user.password_salt);  // encrypt password using salt

        try {
            await user.save();
            const payload: JwtPayloadInterface = { userId: user.id, email: user.email }
            return payload;
        }catch(error){
            // duplicate entry
            if(error.code === "ER_DUP_ENTRY"){
                throw new ConflictException(error.detail);
            }else{
                console.log(error);
                throw new InternalServerErrorException(error.detail);
            }
        }
    }

    private async hashedPassword(password: string, password_salt: string): Promise<string> {
        return bcrypt.hash(password, password_salt);
    }
}
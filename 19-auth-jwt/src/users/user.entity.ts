import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, Unique, OneToMany, Exclusion } from "typeorm";
import { IsNotEmpty, MinLength, MaxLength, Matches, IsString, IsOptional } from "class-validator";
import * as bcrypt from 'bcrypt';
import { Address } from "src/address/address.entity";
import { Exclude, classToPlain } from 'class-transformer';
import { UserTypeEnum } from "./user-type.enum";

@Entity()
// @Unique(['email', 'username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, unique: true})
    username: string;

    @Column({nullable: false})
    userType: UserTypeEnum;


    @Column({unique: true})
    @IsString()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Exclude()
    password: string;

    @Column()
    @IsString()
    @Exclude()
    password_salt: string;

    @OneToMany(type => Address, address => address.testUserId2, {eager: true})
    addresses: Address[];
      
    async validPassword(password: string): Promise<boolean>{
        const hashed_password = await bcrypt.hash(password, this.password_salt);
        return hashed_password === this.password
    }
}
import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, Unique, OneToMany } from "typeorm";
import { IsNotEmpty, MinLength, MaxLength, Matches, IsString, IsOptional } from "class-validator";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    username: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @Column()
    @IsString()
    password_salt: string;

    async validPassword(password: string): Promise<boolean>{
        const hashed_password = await bcrypt.hash(password, this.password_salt);
        return hashed_password === this.password
    }
}
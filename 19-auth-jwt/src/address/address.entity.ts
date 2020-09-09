import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";
import { User } from "src/users/user.entity";

@Entity()
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, unique: true})
    type: string;

    @Column({unique: true})
    @IsString()
    @IsNotEmpty()
    street: string;

    @Column()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    city: string;

    @Column()
    zipCode: number;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.addresses, {eager: false})
    user: User;
}
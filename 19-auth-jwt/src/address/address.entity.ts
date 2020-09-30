import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";
import { User } from "../users/user.entity";

@Entity()
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    type: string;

    street: string;

    @Column()
    city: string;

    @Column()
    zipCode: number;

    // @Column()
    // userId: number;

    //Adding custom foreign key name
    @ManyToOne(type => User, user => user.addresses, {eager: false})
    @JoinColumn([{name:  "testUserId2", referencedColumnName: "id"}])
    testUserId2: number;
}
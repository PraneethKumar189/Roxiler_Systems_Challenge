import {Entity,PrimaryGeneratedColumn,Column, BeforeInsert} from 'typeorm';
import * as bcrypt from 'bcrypt'

export enum UserRole{
    USER = 'USER',
    ADMIN = 'ADMIN',
    S_OWNER = 'S_OWNER'  //store owner in short
}

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    user_id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({
        type:"enum",
        enum:UserRole,
        default:UserRole.USER,

    })
    role:UserRole;

    @Column({nullable:true})
    refreshToken:string;

    @BeforeInsert()
   async hashPassword(){
        this.password = await  bcrypt.hash(this.password,10);
    }
}
import { Injectable } from "@nestjs/common";
import {Users} from "./entities/User.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>){}

    async findAll(): Promise<Users[]>{
        return this.usersRepository.find();
    }

    async CreateUser(createUser:CreateUserDto):Promise<Users>{

        const user= this.usersRepository.create(createUser);
        return this.usersRepository.save(user);

    }

    async findOne(email:string){
        return this.usersRepository.findOne({where:{email}});
    }

    async updateRefreshToken(user_id:number,refreshToken:string){
        return this.usersRepository.update(user_id,{refreshToken});
    }
}
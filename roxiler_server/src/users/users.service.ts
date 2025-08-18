import { Injectable, NotFoundException } from "@nestjs/common";
import { Users, UserRole } from "./entities/User.entity";
import { Repository, Like } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import * as bcrypt from 'bcrypt';

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

    async findOne(email: string) {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findById(id: number) {
        const user = await this.usersRepository.findOne({
            where: { user_id: id },
            relations: ['store']
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findAllWithFilters(filters: {
        name?: string;
        email?: string;
        address?: string;
        role?: UserRole;
    }) {
        const where: any = {};

        if (filters.name) {
            where.name = Like(`%${filters.name}%`);
        }
        if (filters.email) {
            where.email = Like(`%${filters.email}%`);
        }
        if (filters.address) {
            where.address = Like(`%${filters.address}%`);
        }
        if (filters.role) {
            where.role = filters.role;
        }

        return this.usersRepository.find({
            where,
            relations: ['store'],
            select: ['user_id', 'name', 'email', 'address', 'role']
        });
    }

    async updatePassword(id: number, newPassword: string) {
        const user = await this.findById(id);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.usersRepository.update(id, { password: hashedPassword });
        return { message: 'Password updated successfully' };
    }

    async getTotalCount(): Promise<number> {
        return this.usersRepository.count();
    }
}
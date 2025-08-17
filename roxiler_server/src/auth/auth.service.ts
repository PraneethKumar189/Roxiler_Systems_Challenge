import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "src/users/users.service"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import * as  bcrypt from "bcrypt"
import { Users } from "src/users/entities/User.entity"
import { CreateUserDto } from "src/users/dto/createUser.dto"
import { LoginDto } from "./dto/login.dto"

@Injectable()
export class AuthService{
 constructor(private userService:UserService,private jwtService:JwtService,private configService:ConfigService){}

 async ValidateUser(email:string,password:string){
    const user= await this.userService.findOne(email);
    if(user && (await bcrypt.compare(password,user.password))){
        const {password,...result}=user;
        return result;
    }
    return null;

 }

async refreshToken(user: Users) {
  const payload = { email: user.email, sub: user.user_id, role: user.role };
  return {
    access_token: this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    }),
  };
}

 async register(createuserdto:CreateUserDto){
    const existing_user = await this.userService.findOne(createuserdto.email)

    if(existing_user){
        throw new ConflictException("User already exists")
    }
    const user = await this.userService.CreateUser(createuserdto);
     
    const payload = {email:user.email,id:user.user_id,role:user.role}
    return {
        access_token: this.jwtService.sign(payload, {
          secret: this.configService.get<string>('JWT_SECRET'),
        }),
        
          refresh_token: this.jwtService.sign(payload, {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '7d',
          }),
      };

    
 }

async login(loginDto: LoginDto) {
  const user = await this.ValidateUser(loginDto.email, loginDto.password);

  if (!user) {
    throw new UnauthorizedException("Invalid email or password");
  }

  const payload = { sub: user.user_id, email: user.email, role: user.role };
  return {
    access_token: this.jwtService.sign(payload),
    role: user.role,
  };
}


}

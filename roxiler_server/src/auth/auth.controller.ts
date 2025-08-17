import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { Get,Post,Body } from "@nestjs/common";
import { Public } from "./decoraters/public.decorator";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController{
    constructor(private  authService: AuthService){}

    @Public()
    @Post('register')
    async register(@Body() registerDto:RegisterDto){
        return this.authService.register(registerDto)
    }


    @Public()
    @Post('login')
    async login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto)
    }


}
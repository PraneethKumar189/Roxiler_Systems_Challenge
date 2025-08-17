import { IsEmail, IsNotEmpty, IsSemVer, IsString } from "class-validator";



export class CreateUserDto {
    @IsSemVer()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "../entities/User.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(20, { message: 'Name must be at least 20 characters long' })
    @MaxLength(60, { message: 'Name must not exceed 60 characters' })
    name: string;

    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(400, { message: 'Address must not exceed 400 characters' })
    address: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(16, { message: 'Password must not exceed 16 characters' })
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/, {
        message: 'Password must contain at least one uppercase letter and one special character'
    })
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
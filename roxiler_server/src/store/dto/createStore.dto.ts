import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateStoreDTO{

    @IsNotEmpty()
    @IsString()
    store_name:string

    @IsNotEmpty()
    @IsEmail()
    store_email:string

    @IsNotEmpty()
    @IsString()
    store_address:string

    




    
}
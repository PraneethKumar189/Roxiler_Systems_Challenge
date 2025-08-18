import { IsNotEmpty, isNumber } from "class-validator";


export class CreateRatingDto {
   
    @IsNotEmpty()
    rating:number;

    @IsNotEmpty()
    user_id:number;

    @IsNotEmpty()
    store_id:number;


}

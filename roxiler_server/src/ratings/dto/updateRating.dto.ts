import { IsNotEmpty, isNumber } from "class-validator";


export class UpdateRatingDto {
    @IsNotEmpty()
    rating_id:number;
   
    @IsNotEmpty()
    rating:number;

    @IsNotEmpty()
    user_id:number;

    @IsNotEmpty()
    store_id:number;


}

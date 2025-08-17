import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy,'jwt-refresh'){
    constructor(private configService:ConfigService){
        const jwtRefreshSecret = configService.get<string>('JWT_REFRESH_SECRET') || '';
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtRefreshSecret,
            passReqToCallback: true,
        });
    }

    async validate(req:Request,payload:any) {
        const refreshToken=req.headers['authorization'].replace('Bearer','');
        return {...payload,refreshToken}
        
    }
}
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";


export class JwtauthGuard  extends AuthGuard('jwt') implements CanActivate{
    constructor(private reflector:Reflector){
        super()
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic',[context.getHandler(),context.getClass()])
        if(isPublic){
            return true
        }
        return super.canActivate(context)
    }
}
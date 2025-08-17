import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/users.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RefreshJwtStrategy } from './strategy/refresh-jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Users]),
             PassportModule,
            JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '15m' }
            })],
    providers:[AuthService,UserService,JwtStrategy,RefreshJwtStrategy],
    controllers:[AuthController],
    exports:[AuthService]
})
export class AuthModule {}

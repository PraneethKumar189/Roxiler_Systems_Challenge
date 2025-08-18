import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Users } from './users/entities/User.entity';
import { Store } from './store/entities/Store.entity';
import { Ratings } from './ratings/entities/Ratings.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RatingsModule } from './ratings/ratings.module';
import { StoreModule } from './store/store.module';
import { AdminModule } from './admin/admin.module';
import { JwtauthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USERNAME') || 'postgres',
        password: configService.get('DB_PASSWORD') || 'tatvamasi',
        database: configService.get('DB_NAME') || 'roxiler',
        entities: [Users, Store, Ratings],
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    RatingsModule,
    StoreModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtauthGuard,
    },
  ],
})
export class AppModule {}

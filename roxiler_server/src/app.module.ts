import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Users } from './users/entities/User.entity';
import {UsersModule} from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'tatvamasi',
    database: 'roxiler',
    entities: [Users],
    synchronize: true,
  }),ConfigModule.forRoot({
    isGlobal:true,
    envFilePath: '.env'
  }
),UsersModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

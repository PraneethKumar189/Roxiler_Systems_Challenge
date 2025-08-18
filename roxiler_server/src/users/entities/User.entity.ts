import {Entity,PrimaryGeneratedColumn,Column, BeforeInsert,OneToMany} from 'typeorm';
import * as bcrypt from 'bcrypt'
import {Store} from 'src/store/entities/Store.entity'
import {Ratings} from '../../ratings/entities/Ratings.entity';

export enum UserRole{
    USER = 'USER',
    ADMIN = 'ADMIN',
    S_OWNER = 'S_OWNER'  //store owner in short
}

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    user_id:number;

    @Column()
    name:string;

    @Column()
    address:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({
        type:"enum",
        enum:UserRole,
        default:UserRole.USER,

    })
    role:UserRole;

@OneToMany(() => Store, (store: Store) => store.owner)
  stores: Store[];

  @OneToMany(() => Ratings, (rating:Ratings) => rating.user)
  ratings: Ratings[];

    @BeforeInsert()
   async hashPassword(){
        this.password = await  bcrypt.hash(this.password,10);
    }
}



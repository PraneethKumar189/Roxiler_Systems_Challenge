import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Users } from "src/users/entities/User.entity";
import { Ratings } from "../../ratings/entities/Ratings.entity";

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    store_id: number;

    @Column()
    store_name: string;

    @Column({ unique: true, nullable: true })
    store_email: string;

    @Column({ type: "text" })
    store_address: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @OneToOne(() => Users, (user: Users) => user.store, { onDelete: "CASCADE" })
    @JoinColumn()
    owner: Users;

    @OneToMany(() => Ratings, (rating) => rating.store)
    ratings: Ratings[];
}
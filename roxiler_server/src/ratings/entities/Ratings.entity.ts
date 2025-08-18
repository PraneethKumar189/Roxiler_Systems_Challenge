import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "../../users/entities/User.entity";
import { Store } from "../../store/entities/Store.entity";

@Entity("ratings")
export class Ratings {
  @PrimaryGeneratedColumn()
  rating_id: number;

  @Column({ type: "int" })
  rating: number; // 1 to 5

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  
  @ManyToOne(() => Users, (user:Users) => user.ratings, { onDelete: "CASCADE" })
  user: Users;

  @ManyToOne(() => Store, (store) => store.ratings, { onDelete: "CASCADE" })
  store: Store;
}

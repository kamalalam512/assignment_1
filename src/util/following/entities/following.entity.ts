import { User } from 'src/auth/entities/auth.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum Status {
  follow = 'follow',
  unfollow = 'unfollow',
}
@Entity()
export class UserFollow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  followerId: number;

  @ManyToOne(() => User)
  follower: User;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.follow,
  })
  status: Status;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

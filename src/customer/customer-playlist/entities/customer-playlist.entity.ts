import { CustomerProfile } from 'src/customer/customer-profile/entities/customer-profile.entity';
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
  public = 'public',
  private = 'private',
}
@Entity()
export class CustomerPlaylist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerProfileId: number;

  @ManyToOne(() => CustomerProfile)
  customerProfile: CustomerProfile;

  @Column()
  title: string;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.private,
  })
  status: Status;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

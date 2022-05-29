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

@Entity()
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerProfileId: number;

  @ManyToOne(() => CustomerProfile)
  customerProfile: CustomerProfile;

  @Column()
  content: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

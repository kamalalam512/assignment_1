import { Crypt } from 'src/common/crypt';
import { Role } from 'src/util/role/entities/role.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleId: number;

  @ManyToOne(() => Role)
  role: Role;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) this.password = await Crypt.hashString(this.password);
  }

  @Column('boolean', { default: false })
  isVerified: boolean;

  @Column('boolean', { default: false })
  isSuspended: boolean;

  @Column({ nullable: true })
  suspendedDuration: Date;

  @Column({ nullable: true })
  otpCode: string;

  @Column({ nullable: true })
  forgotToke: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

import { ArtistProfile } from 'src/artist/artist-profile/entities/artist-profile.entity';
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
  published = 'published',
  private = 'private',
  schedule = 'schedule',
}
@Entity()
export class ArtistAlbum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artistProfileId: number;

  @ManyToOne(() => ArtistProfile)
  artistProfile: ArtistProfile;

  @Column()
  title: string;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.published,
  })
  status: Status;

  @Column()
  publishDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

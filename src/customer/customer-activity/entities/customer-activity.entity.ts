import { ArtistAlbumTrack } from 'src/artist/artist-album-track/entities/artist-album-track.entity';
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

enum ActivityType {
  saveTrack = 'saveTrack',
  likeTrack = 'likeTrack',
}
@Entity()
export class CustomerActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerProfileId: number;

  @ManyToOne(() => CustomerProfile)
  customerProfile: CustomerProfile;

  @Column()
  artistAlbumTrackId: number;

  @ManyToOne(() => ArtistAlbumTrack)
  artistAlbumTrack: ArtistAlbumTrack;

  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  activityType: ActivityType;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

import { ArtistProfile } from 'src/artist/artist-profile/entities/artist-profile.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArtistAlbum } from './artist-album.entity';
import { ArtistTrack } from './artist-track.entity';

enum Status {
  published = 'published',
  suspended = 'suspended',
}
@Entity()
export class ArtistAlbumTrack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artistProfileId: number;

  @ManyToOne(() => ArtistProfile)
  artistProfile: ArtistProfile;

  @Column()
  artistAlbumId: number;

  @ManyToOne(() => ArtistAlbum)
  artistAlbum: ArtistAlbum;

  @Column()
  artistTrackId: number;

  @OneToOne(() => ArtistTrack)
  artistTrack: ArtistTrack;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.published,
  })
  status: Status;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

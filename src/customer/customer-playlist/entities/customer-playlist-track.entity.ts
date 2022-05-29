import { ArtistAlbumTrack } from 'src/artist/artist-album-track/entities/artist-album-track.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerPlaylist } from './customer-playlist.entity';

@Entity()
export class CustomerPlaylistTrack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerPlaylistId: number;

  @ManyToOne(() => CustomerPlaylist)
  customerPlaylist: CustomerPlaylist;

  @Column()
  artistAlbumTrackId: number;

  @ManyToOne(() => ArtistAlbumTrack)
  artistAlbumTrack: ArtistAlbumTrack;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

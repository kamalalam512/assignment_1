import { ArtistAlbumTrack } from 'src/artist/artist-album-track/entities/artist-album-track.entity';
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

enum reportAction {
  ignored = 'ignored',
  published = 'published',
  suspended = 'suspended',
}
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artistAlbumTrackId: number;

  @ManyToOne(() => ArtistAlbumTrack)
  artistAlbumTrack: ArtistAlbumTrack;

  @Column()
  reportById: number;

  @ManyToOne(() => User)
  reportBy: User;

  @Column()
  reason: string;

  @Column('boolean', { default: false })
  isView: boolean;

  @Column({
    type: 'enum',
    enum: reportAction,
    default: reportAction.published,
  })
  reportAction: reportAction;

  @Column({ nullable: true })
  suspendedDuration: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

import { ArtistProfile } from 'src/artist/artist-profile/entities/artist-profile.entity';
import { Genre } from 'src/util/genre/entities/genre.entity';
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
export class ArtistTrack {
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

  @Column()
  fileFormat: string;

  @Column()
  duration: number;

  @Column()
  genreId: number;

  @ManyToOne(() => Genre)
  genre: Genre;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.public,
  })
  status: Status;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AdminProfile } from 'src/admin/admin-profile/entities/admin-profile.entity';
import { User } from 'src/auth/entities/auth.entity';
import { CustomerProfile } from 'src/customer/customer-profile/entities/customer-profile.entity';
import { ArtistProfile } from 'src/artist/artist-profile/entities/artist-profile.entity';
import { Role } from 'src/util/role/entities/role.entity';
import { ArtistAlbumTrack } from 'src/artist/artist-album-track/entities/artist-album-track.entity';
import { ArtistAlbum } from 'src/artist/artist-album-track/entities/artist-album.entity';
import { ArtistTrack } from 'src/artist/artist-album-track/entities/artist-track.entity';
import { CustomerActivity } from 'src/customer/customer-activity/entities/customer-activity.entity';
import { CustomerPlaylistTrack } from 'src/customer/customer-playlist/entities/customer-playlist-track.entity';
import { CustomerPlaylist } from 'src/customer/customer-playlist/entities/customer-playlist.entity';
import { SearchHistory } from 'src/customer/search-history/entities/search-history.entity';
import { UserFollow } from 'src/util/following/entities/following.entity';
import { Genre } from 'src/util/genre/entities/genre.entity';
import { Report } from 'src/util/report/entities/report.entity';

dotenv.config();

const dbConfig = {
  host: process.env.TYPE_ORM_DATABASE_HOST || `127.0.0.1`,
  port: process.env.TYPE_ORM_DATABASE_PORT || 5432,
  username: process.env.TYPE_ORM_DATABASE_USERNAME || 'postgres',
  password: process.env.TYPE_ORM_DATABASE_PASSWORD || '',
  name: process.env.TYPE_ORM_DATABASE_NAME || `test`,
};

// console.log(dbConfig);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: +dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.name,
  logging: false,
  entities: [
    Role,
    User,
    CustomerProfile,
    ArtistProfile,
    AdminProfile,
    ArtistAlbumTrack,
    ArtistAlbum,
    ArtistTrack,
    CustomerActivity,
    CustomerPlaylistTrack,
    CustomerPlaylist,
    SearchHistory,
    UserFollow,
    Genre,
    Report,
  ],
  synchronize: true,
};

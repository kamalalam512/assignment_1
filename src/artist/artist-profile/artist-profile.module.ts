import { Module } from '@nestjs/common';
import { ArtistProfileService } from './artist-profile.service';
import { ArtistProfileController } from './artist-profile.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthModule],
  controllers: [ArtistProfileController],
  providers: [ArtistProfileService],
  exports: [ArtistProfileService],
})
export class ArtistProfileModule {}

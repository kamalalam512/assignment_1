import { Controller, Get, Body, Patch } from '@nestjs/common';
import { hasRole } from 'src/auth/guards/permission.decorator';
import { RoleType } from 'src/common/constant';
import { ArtistProfileService } from './artist-profile.service';
import { UpdateArtistProfileDto } from './dto/update-artist-profile.dto';

@hasRole(RoleType.artist)
@Controller('artist-profile')
export class ArtistProfileController {
  constructor(private readonly artistProfileService: ArtistProfileService) {}

  @Get()
  findAll() {
    return this.artistProfileService.profile();
  }

  @Patch()
  update(@Body() updateDriverProfileDto: UpdateArtistProfileDto) {
    return this.artistProfileService.update(updateDriverProfileDto);
  }
}

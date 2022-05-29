import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Connection, getRepository } from 'typeorm';
import { UpdateArtistProfileDto } from './dto/update-artist-profile.dto';
import { ArtistProfile } from './entities/artist-profile.entity';

@Injectable()
export class ArtistProfileService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly authService: AuthService,
  ) {}

  async profile() {
    try {
      const artistProfileRepo = getRepository(ArtistProfile);
      const profileId = await this.authService.getArtistProfileId();
      const profile = await artistProfileRepo.findOne({
        where: { id: profileId },
      });
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const artistProfileRepo = getRepository(ArtistProfile);
      const profile = await artistProfileRepo.findOne({ where: { id } });
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(updateArtistProfileDto: UpdateArtistProfileDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const id = await this.authService.getArtistProfileId();
      const artistProfileRepo =
        queryRunner.manager.getRepository(ArtistProfile);
      await artistProfileRepo.update({ id }, updateArtistProfileDto);
      await queryRunner.commitTransaction();
      const profile = await this.findOne(id);
      return profile;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}

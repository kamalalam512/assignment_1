import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Connection, getRepository } from 'typeorm';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';
import { AdminProfile } from './entities/admin-profile.entity';

@Injectable()
export class AdminProfileService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly authService: AuthService,
  ) {}

  async profile() {
    try {
      const adminProfileRepo = getRepository(AdminProfile);
      const profileId = await this.authService.getAdminProfileId();
      const profile = await adminProfileRepo.findOne({
        where: { id: profileId },
      });
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const adminProfileRepo = getRepository(AdminProfile);
      const profile = await adminProfileRepo.findOne({ where: { id } });
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(updateAdminProfileDto: UpdateAdminProfileDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const id = await this.authService.getAdminProfileId();
      const adminProfileRepo = queryRunner.manager.getRepository(AdminProfile);
      await adminProfileRepo.update({ id }, updateAdminProfileDto);
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

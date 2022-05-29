import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Connection, getRepository } from 'typeorm';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { CustomerProfile } from './entities/customer-profile.entity';

@Injectable()
export class CustomerProfileService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly authService: AuthService,
  ) {}

  async profile() {
    try {
      const customerProfileRepo = getRepository(CustomerProfile);
      const profileId = await this.authService.getCustomerProfileId();
      const profile = await customerProfileRepo.findOne({
        where: { id: profileId },
      });
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const customerProfileRepo = getRepository(CustomerProfile);
      const profile = await customerProfileRepo.findOne({ where: { id } });
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(updateCustomerProfileDto: UpdateCustomerProfileDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const id = await this.authService.getCustomerProfileId();
      const customerProfileRepo =
        queryRunner.manager.getRepository(CustomerProfile);
      await customerProfileRepo.update({ id }, updateCustomerProfileDto);
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

import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/typeorm';
import { CommonMessage } from 'src/common/comman.message';
import { Crypt } from 'src/common/crypt';
import { CustomerProfile } from 'src/customer/customer-profile/entities/customer-profile.entity';
import { ArtistProfile } from 'src/artist/artist-profile/entities/artist-profile.entity';
import { Role } from 'src/util/role/entities/role.entity';
import { Connection, getRepository } from 'typeorm';
import {
  AccountVerfificationDto,
  CustomerSignupDto,
  ArtistSignupDto,
  LoginDto,
  AdminSignupDto,
  AccountVerfificationCodeDto,
} from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AdminProfile } from 'src/admin/admin-profile/entities/admin-profile.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private jwtService: JwtService,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async customerSignup(customerSignupDto: CustomerSignupDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const error = await this.phoneAndEmailCheck(
        customerSignupDto.email,
        customerSignupDto.phone,
      );
      if (error != false) {
        throw new ConflictException(error);
      }
      const userRepository = queryRunner.manager.getRepository(User);
      const customerProfileRepo =
        queryRunner.manager.getRepository(CustomerProfile);
      const roleRepository = queryRunner.manager.getRepository(Role);
      customerSignupDto.password = (
        await Crypt.hashString(customerSignupDto.password)
      ).toString();
      const role = await roleRepository.findOne({
        where: { title: 'customer' },
      });
      if (!role) {
        throw new InternalServerErrorException(CommonMessage.roleError);
      }
      customerSignupDto['roleId'] = role.id;
      customerSignupDto['otpCode'] = (
        Math.floor(Math.random() * 9000) + 1000
      ).toString();
      const user = await userRepository.save(customerSignupDto);
      customerSignupDto['userId'] = user.id;
      await customerProfileRepo.save(customerSignupDto);
      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async artistSignup(artistSignupDto: ArtistSignupDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const error = await this.phoneAndEmailCheck(
        artistSignupDto.email,
        artistSignupDto.phone,
      );
      if (error != false) {
        throw new ConflictException(error);
      }
      const userRepository = queryRunner.manager.getRepository(User);
      const artistProfileRepo =
        queryRunner.manager.getRepository(ArtistProfile);
      const roleRepository = queryRunner.manager.getRepository(Role);

      artistSignupDto.password = (
        await Crypt.hashString(artistSignupDto.password)
      ).toString();
      const role = await roleRepository.findOne({ where: { title: 'artist' } });
      if (!role) {
        throw new InternalServerErrorException(CommonMessage.roleError);
      }
      artistSignupDto['roleId'] = role.id;
      artistSignupDto['otpCode'] = (
        Math.floor(Math.random() * 9000) + 1000
      ).toString();
      const user = await userRepository.save(artistSignupDto);
      artistSignupDto['userId'] = user.id;
      await artistProfileRepo.save(artistSignupDto);
      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const userRepository = getRepository(User);
      const roleRepository = getRepository(Role);
      const user = await userRepository.findOne({
        where: { email: loginDto.email },
      });
      if (!user) {
        throw new UnauthorizedException(CommonMessage.invalidCredential);
      }
      if (user && (await Crypt.compare(loginDto.password, user.password))) {
        const accessToken = await this.jwtService.sign({
          email: user.email,
          id: user.id,
        });
        if (!user.isVerified) {
          throw new BadRequestException(CommonMessage.plzVerifyAccount);
        }
        const role = await roleRepository.findOne({
          where: { id: user.roleId },
        });
        const data = {
          accessToken,
          roleId: role.id,
          roleTitle: role.title,
        };
        return data;
      }
      throw new UnauthorizedException(CommonMessage.invalidCredential);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async accountVerfication(accountVerfificationDto: AccountVerfificationDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const code = await this.getOtp({ phone: accountVerfificationDto.phone });
      if (code.code != accountVerfificationDto.code)
        throw new BadRequestException(CommonMessage.invalidCode);
      const userRepository = queryRunner.manager.getRepository(User);
      const user = await userRepository.findOne({
        where: { phone: accountVerfificationDto.phone },
      });
      if (!user) {
        throw new BadRequestException(CommonMessage.invalidCode);
      }
      await userRepository.update(
        { id: user.id },
        { isVerified: true, otpCode: null },
      );
      await queryRunner.commitTransaction();
      return [];
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async getOtp(accountVerfificationCodeDto: AccountVerfificationCodeDto) {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({
        where: { phone: accountVerfificationCodeDto.phone },
      });
      if (!user) {
        throw new BadRequestException(CommonMessage.invalidCode);
      }
      return { code: user.otpCode };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async phoneAndEmailCheck(email: string, phone: string) {
    try {
      const userRepository = getRepository(User);
      const emailCheck = await userRepository.findOne({
        where: { email: email },
      });
      const phoneCheck = await userRepository.findOne({
        where: { phone: phone },
      });
      if (phoneCheck) {
        return 'Phone number already exists';
      }
      if (emailCheck) {
        return 'Email address already exists';
      }
      return false;
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async getUserId() {
    try {
      const userId = this.request['user'].id;
      if (!userId) {
        throw new UnauthorizedException();
      }
      return userId;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getUserIdByEmail(email: string) {
    try {
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({ where: { email } });
      if (!user) {
        throw new InternalServerErrorException('Admin account not found');
      }
      return user.id;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getArtistProfileId() {
    try {
      const artistProfileRepo = getRepository(ArtistProfile);
      const userId = this.request['user'].id;
      if (!userId) {
        throw new UnauthorizedException();
      }
      const profile = await artistProfileRepo.findOne({ where: { userId } });
      return profile.id;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getCustomerProfileId() {
    try {
      const customerProfileRepo = getRepository(CustomerProfile);
      const userId = this.request['user'].id;
      if (!userId) {
        throw new UnauthorizedException();
      }
      const profile = await customerProfileRepo.findOne({ userId });
      return profile.id;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getAdminProfileId() {
    try {
      const adminProfileRepo = getRepository(AdminProfile);
      const userId = this.request['user'].id;
      if (!userId) {
        throw new UnauthorizedException();
      }
      const profile = await adminProfileRepo.findOne({ userId });
      return profile.id;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async adminSignup(adminSignupDto: AdminSignupDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const error = await this.phoneAndEmailCheck(
        adminSignupDto.email,
        adminSignupDto.phone,
      );
      if (error != false) {
        throw new ConflictException(error);
      }
      const userRepository = queryRunner.manager.getRepository(User);
      const adminProfileRepo = queryRunner.manager.getRepository(AdminProfile);
      const roleRepository = queryRunner.manager.getRepository(Role);
      adminSignupDto.password = (
        await Crypt.hashString(adminSignupDto.password)
      ).toString();
      const role = await roleRepository.findOne({ where: { title: 'admin' } });
      if (!role) {
        throw new InternalServerErrorException(CommonMessage.roleError);
      }
      adminSignupDto['roleId'] = role.id;
      adminSignupDto['isVerified'] = true;
      const user = await userRepository.save(adminSignupDto);
      adminSignupDto['userId'] = user.id;
      await adminProfileRepo.save(adminSignupDto);
      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}

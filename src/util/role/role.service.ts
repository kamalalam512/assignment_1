import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { CommonMessage } from 'src/common/comman.message';
import { Connection, getRepository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ){}

  async create(createRoleDto: CreateRoleDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const roleRepository = queryRunner.manager.getRepository(Role)
      const role = await roleRepository.save(createRoleDto);
      await queryRunner.commitTransaction();
      return role
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      const roleRepository = getRepository(Role)
      const roles = await roleRepository.createQueryBuilder('role')
      .select(['id','title'])
      .getMany()
      return roles;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const roleRepository = getRepository(Role)
      const role = await roleRepository.createQueryBuilder('role')
      .select(['id','title'])
      .where('role.id = :id',{id})
      .getOne()
      if(!role){
        throw new BadRequestException(CommonMessage.idNotFount)
      }
      return role;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.findOne(id); // for validation for id
      const roleRepository = queryRunner.manager.getRepository(Role);
      await roleRepository.update({id},updateRoleDto);
      const role = await this.findOne(id);
      await queryRunner.commitTransaction();
      return role;
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.findOne(id); // for validation for id
      const roleRepository = queryRunner.manager.getRepository(Role);
      await roleRepository.softDelete(id)
      await queryRunner.commitTransaction();
      return [];
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}

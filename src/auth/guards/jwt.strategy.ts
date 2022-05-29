import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, getRepository } from 'typeorm';
import { LoginDto } from '../dto/create-auth.dto';
import { jwtConfig } from 'src/config/jwt.config';
import { User } from '../entities/auth.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: LoginDto): Promise<any> {
    try {
      const { email } = payload;
      const userRepo = await getRepository(User);
      const user = await userRepo
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.role', 'role', 'role.id = user.roleId')
        .where('user.email = :email', { email })
        .getOne();
      if (!user) {
        throw new UnauthorizedException();
      }
      return { ...user };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

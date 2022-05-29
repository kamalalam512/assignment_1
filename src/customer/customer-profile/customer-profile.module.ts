import { Module } from '@nestjs/common';
import { CustomerProfileService } from './customer-profile.service';
import { CustomerProfileController } from './customer-profile.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule
  ],
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService],
  exports: [CustomerProfileService]
})
export class CustomerProfileModule { }

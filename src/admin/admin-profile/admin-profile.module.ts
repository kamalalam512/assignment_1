import { Module } from '@nestjs/common';
import { AdminProfileService } from './admin-profile.service';
import { AdminProfileController } from './admin-profile.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthModule],
  controllers: [AdminProfileController],
  providers: [AdminProfileService],
})
export class AdminProfileModule {}

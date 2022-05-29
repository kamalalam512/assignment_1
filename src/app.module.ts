import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalReponseInterceptor } from './common/globalReponse.interceptor';
import { typeOrmConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './util/role/role.module';
import { CustomerProfileModule } from './customer/customer-profile/customer-profile.module';
import { ArtistProfileModule } from './artist/artist-profile/artist-profile.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { JwtStrategy } from './auth/guards/jwt.strategy';
import { AdminProfileModule } from './admin/admin-profile/admin-profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    RoleModule,
    CustomerProfileModule,
    ArtistProfileModule,
    AdminProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, // for response template with status, statusCode and data
      useClass: GlobalReponseInterceptor,
    },
    RolesGuard,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class AppModule {}

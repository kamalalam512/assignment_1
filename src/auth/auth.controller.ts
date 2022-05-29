import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AccountVerfificationDto,
  CustomerSignupDto,
  ArtistSignupDto,
  LoginDto,
  AdminSignupDto,
  AccountVerfificationCodeDto,
} from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('customer-signup')
  customerSignup(@Body() customerSignupDto: CustomerSignupDto) {
    return this.authService.customerSignup(customerSignupDto);
  }

  @Post('artist-signup')
  driverSignup(@Body() artistSignupDto: ArtistSignupDto) {
    return this.authService.artistSignup(artistSignupDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('get-Otp-demo')
  getOtp(@Body() accountVerfificationCodeDto: AccountVerfificationCodeDto) {
    return this.authService.getOtp(accountVerfificationCodeDto);
  }

  @Post('account-verfication')
  accountVerfication(@Body() accountVerfificationDto: AccountVerfificationDto) {
    return this.authService.accountVerfication(accountVerfificationDto);
  }

  @Post('admin-set')
  createAdmin(@Body() adminSignupDto: AdminSignupDto) {
    return this.authService.adminSignup(adminSignupDto);
  }
}

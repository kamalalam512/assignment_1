import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { hasRole } from 'src/auth/guards/permission.decorator';
import { RoleType } from 'src/common/constant';
import { CustomerProfileService } from './customer-profile.service';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';

@hasRole(RoleType.customer)
@Controller('customer-profile')
export class CustomerProfileController {
  constructor(
    private readonly customerProfileService: CustomerProfileService,
  ) {}

  @Get()
  profile() {
    return this.customerProfileService.profile();
  }

  @Patch()
  update(@Body() updateCustomerProfileDto: UpdateCustomerProfileDto) {
    return this.customerProfileService.update(updateCustomerProfileDto);
  }
}

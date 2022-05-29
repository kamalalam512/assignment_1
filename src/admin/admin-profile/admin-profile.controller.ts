import { Controller, Get, Body, Patch } from '@nestjs/common';
import { hasRole } from 'src/auth/guards/permission.decorator';
import { RoleType } from 'src/common/constant';
import { AdminProfileService } from './admin-profile.service';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';

@hasRole(RoleType.admin)
@Controller('admin-profile')
export class AdminProfileController {
  constructor(private readonly adminProfileService: AdminProfileService) {}

  @Get()
  findAll() {
    return this.adminProfileService.profile();
  }

  @Patch()
  update(@Body() updateAdminProfileDto: UpdateAdminProfileDto) {
    return this.adminProfileService.update(updateAdminProfileDto);
  }
}

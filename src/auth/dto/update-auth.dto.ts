import { PartialType } from '@nestjs/swagger';
import {
  CreateAuthDto,
  CustomerSignupDto,
  ArtistSignupDto,
} from './create-auth.dto';

export class UpdateCustomerSignupDto extends PartialType(CustomerSignupDto) {}

export class UpdateArtistSignupDto extends PartialType(ArtistSignupDto) {}

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {}

export class CustomerSignupDto {
  @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: `Password Must Be Longer Than 8 Characters` })
  @MaxLength(20, { message: `Password Must Be Less Than 20 Characters` })
  @Matches(/((?=.*[a-z])(?=.*[A-Z]))/, {
    message: `Password Must Contain Upper Case Letter & Lower Case Letters`,
  })
  @Matches(/((?=.*[0-9]))/, {
    message: `Password Must Contain a number from 0-9`,
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}

export class ArtistSignupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: `Password Must Be Longer Than 8 Characters` })
  @MaxLength(20, { message: `Password Must Be Less Than 20 Characters` })
  @Matches(/((?=.*[a-z])(?=.*[A-Z]))/, {
    message: `Password Must Contain Upper Case Letter & Lower Case Letters`,
  })
  @Matches(/((?=.*[0-9]))/, {
    message: `Password Must Contain a number from 0-9`,
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  userName: string;
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: `Password Must Be Longer Than 8 Characters` })
  @MaxLength(20, { message: `Password Must Be Less Than 20 Characters` })
  @Matches(/((?=.*[a-z])(?=.*[A-Z]))/, {
    message: `Password Must Contain Upper Case Letter & Lower Case Letters`,
  })
  @Matches(/((?=.*[0-9]))/, {
    message: `Password Must Contain a number from 0-9`,
  })
  password: string;
}

export class AccountVerfificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: `Code Must Be Longer Than 4 Characters` })
  @MaxLength(4, { message: `Code Must Be Less Than 4 Characters` })
  code: string;
}

export class AccountVerfificationCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}

export class AdminSignupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: `Password Must Be Longer Than 8 Characters` })
  @MaxLength(20, { message: `Password Must Be Less Than 20 Characters` })
  @Matches(/((?=.*[a-z])(?=.*[A-Z]))/, {
    message: `Password Must Contain Upper Case Letter & Lower Case Letters`,
  })
  @Matches(/((?=.*[0-9]))/, {
    message: `Password Must Contain a number from 0-9`,
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}

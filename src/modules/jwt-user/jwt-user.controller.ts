import {
  IsString,
  IsEmail,
  Validate,
  Length,
} from 'class-validator';
import { JwtUserService } from './jwt-user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { IsValidPhoneNumber } from './validator/is-valid-phone-number.validator';

export class UserBody {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @Length(10, 10, {
    message: 'Phone number must be exactly 10 digits',
  })
  @Validate(IsValidPhoneNumber)
  phone: string;
}

@Controller('jwt-user')
export class JwtUserController {
  constructor(private readonly jwtUserService: JwtUserService) {}

  @Post('create')
  async createNewUserWithPhoneRelationship(@Body() userBody: UserBody) {
    return this.jwtUserService.createJwtUser(userBody);
  }
}

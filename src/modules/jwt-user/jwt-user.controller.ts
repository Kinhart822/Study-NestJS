import { JwtUserService } from './jwt-user.service';
import { Controller } from '@nestjs/common';

@Controller('jwt-user')
export class JwtUserController {
  constructor(private readonly jwtUserService: JwtUserService) {}
}

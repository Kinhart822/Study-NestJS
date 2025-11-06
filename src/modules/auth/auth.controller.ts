import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtUserService } from '../jwt-user/jwt-user.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  // private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly jwtUserService: JwtUserService,
  ) {}

  @Post('register')
  async register(@Body() userData: any) {
    return this.jwtUserService.createNewUser(userData);
  }

  // @Post('login')
  // async login(@Body() loginData: any) {
  //   const { email, password } = loginData;
  //   return this.jwtUserService.validateUser(email, password);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // @Request() là một decorator của NestJS:
  // Dùng để inject đối tượng Request (của Express) - mô tả toàn bộ
  // thông tin của HTTP request mà client gửi lên vào method controller.
  async login(@Request() req) {
    console.log(req.user); // { id: 1, email: 'user@example.com' }
    const access_token = this.authService.login(req.user); // tạo JWT token
    console.log(access_token);
    return access_token;
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh Token is required');
    }
    const user = await this.authService.verifyRefreshToken(refreshToken);
    // console.log('Refresh ok' + user);
    if (!user) {
      throw new BadRequestException('Invalid refresh token');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Request() req) {
    console.log(req.user);
    // this.logger.log("Meomeo");
    return req.user;
  }
}

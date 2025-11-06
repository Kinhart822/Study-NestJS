import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtUserService } from '../jwt-user/jwt-user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly jwtUserService: JwtUserService,
  ) {}

  async validateUser(email: string, password: string) {
    return this.jwtUserService.validateUser(email, password);
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      name: user.name,
    };
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRED'),
    });
    this.jwtUserService.saveRefreshToken(refresh_token, user.id);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refresh_token,
    };
  }

  async verifyRefreshToken(token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (decodedToken) {
      return this.jwtUserService.validateRefreshToken(token, decodedToken.sub);
    }
    return false;
  }
}

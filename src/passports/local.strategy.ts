import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtUser } from 'src/entities/jwt-user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Gọi super() để cấu hình fields
        // Mặc định passport-local sử dụng 'username' và 'password'
        // nên ta cần override để dùng 'email' thay cho 'username'
    super({
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string): Promise<JwtUser> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

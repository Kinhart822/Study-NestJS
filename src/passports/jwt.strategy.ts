import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUserService } from 'src/modules/jwt-user/jwt-user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private readonly configService: ConfigService,
    private readonly jwtUserService: JwtUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
      // configService.get('JWT_SECRET_KEY') 
      // // - Chưa hiểu sao lỗi
    })
  }

  async validate(payload: any) {
    const user = await this.jwtUserService.findByEmail(payload.email);
    return user;
  }
}

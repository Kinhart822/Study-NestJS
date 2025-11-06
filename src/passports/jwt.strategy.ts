import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtUserService } from 'src/modules/jwt-user/jwt-user.service';

// JwtStrategy validates the token sent by the user. 
//      It extracts the user ID from the token and looks it up in the database
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtUserService: JwtUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '45c0acfd9ccef2c7584eed3b6c0f5621a40b6e49324ae77125ffab7fea536ed6',
    });
  }

  async validate(payload: any) {
    // return {userId: payload.sub, username: payload.username};
    const email = payload.email;
    const user = this.jwtUserService.findByEmail(email);
    return user;
  }
}
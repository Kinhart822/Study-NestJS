import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtUserModule } from '../jwt-user/jwt-user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/passports/local.strategy';
import { JwtStrategy } from 'src/passports/jwt.strategy';
// import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    JwtUserModule,
    PassportModule,
    JwtModule.register({
      // Khóa bí mật để ký JWT
      secret:
        '45c0acfd9ccef2c7584eed3b6c0f5621a40b6e49324ae77125ffab7fea536ed6',
      // Thời gian hết hạn của token
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

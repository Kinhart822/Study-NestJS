import { Module } from '@nestjs/common';
import { JwtUserService } from './jwt-user.service';
import { JwtUserController } from './jwt-user.controller';
import { JwtUser } from '../../entities/jwt-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from 'src/entities/phone.entity';

@Module({
  controllers: [JwtUserController],
  providers: [JwtUserService],
  exports: [JwtUserService],
  imports: [
    TypeOrmModule.forFeature([JwtUser, Phone]),
  ],
})
export class JwtUserModule {}

import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { JwtUser } from '../../entities/jwt-user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtUserService {
  constructor(
    @InjectRepository(JwtUser)
    private readonly jwtUserRepository: Repository<JwtUser>,
  ) {}

  findByEmail(email: string) {
    return this.jwtUserRepository.findOne({ where: { email } });
  }

  async createNewUser(userData: Partial<JwtUser>): Promise<JwtUser> {
    const hashPassword = await bcrypt.hash(userData.password, 10);
    const newUser = this.jwtUserRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashPassword,
    });
    return this.jwtUserRepository.save(newUser);
  }

  async validateUser(email: string, password: string): Promise<JwtUser | null> {
    const user = await this.jwtUserRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async saveRefreshToken(refreshToken: string, userId: number) {
    const user = await this.jwtUserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);;
    user.refreshToken = hashRefreshToken;

    return this.jwtUserRepository.save(user);
  }

  async validateRefreshToken(refresh_token: string, userid: number) {
    const user = await this.jwtUserRepository.findOneBy({ id : userid});
    if (user){
      const status = await bcrypt.compare(refresh_token, user.refreshToken);
      if (status){
        return user;
      }
    }
    return false;
  }
}

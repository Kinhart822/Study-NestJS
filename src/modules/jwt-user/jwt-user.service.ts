import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtUser } from '../../entities/jwt-user.entity';
import * as bcrypt from 'bcrypt';
import { UserBody } from './jwt-user.controller';
import { Phone } from 'src/entities/phone.entity';
import { runOnTransactionCommit, Transactional } from 'typeorm-transactional';

@Injectable()
export class JwtUserService {
  constructor(
    @InjectRepository(JwtUser)
    private readonly jwtUserRepository: Repository<JwtUser>,

    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
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

    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashRefreshToken;

    return this.jwtUserRepository.save(user);
  }

  async validateRefreshToken(refresh_token: string, userid: number) {
    const user = await this.jwtUserRepository.findOneBy({ id: userid });
    if (user) {
      const status = await bcrypt.compare(refresh_token, user.refreshToken);
      if (status) {
        return user;
      }
    }
    return false;
  }

  // Omit<Type, Keys> là utility type có sẵn trong TypeScript.
  //    Giúp tạo ra một kiểu mới (type) từ một type đã có, bỏ đi một
  //    or nhiều thuộc tính.
  // async createJwtUser(userData: Omit<UserBody, 'phone'>) {
  async createJwtUser(userData: UserBody) {
    const isExistInDB = await this.phoneRepository.exist({
      where: { phone: userData.phone },
    });
    if (isExistInDB) {
      throw new BadRequestException('Phone already existed');
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    const user = this.jwtUserRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashPassword,
      phone: {
        phone: userData.phone,
      },
    });

    runOnTransactionCommit(() => console.log('post created'));
    return await this.jwtUserRepository.save(user);
  }
}

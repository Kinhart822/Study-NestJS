import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';

@Injectable()
// @Injectable({ scope: Scope.REQUEST })
// @Injectable({ scope: Scope.TRANSIENT })

// 3 dạng scope chính cho Injectable service trong NestJS: Singleton, Request, Transient
//      Mặc định là Singleton: 1 instance cho toàn bộ ứng dụng
//      Request: 1 instance cho mỗi request
//      Transient: tạo mới instance mỗi khi được inject
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    // return this.userRepository.findOne({ where: { id } });
    return this.userRepository.findOneBy({ id });
  }

  create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    return this.userRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updated;
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}

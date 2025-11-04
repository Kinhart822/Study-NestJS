import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
// @Injectable({ scope: Scope.REQUEST })
// @Injectable({ scope: Scope.TRANSIENT })

// 3 dạng scope chính cho Injectable service trong NestJS: Singleton, Request, Transient
//      Mặc định là Singleton: 1 instance cho toàn bộ ứng dụng
//      Request: 1 instance cho mỗi request
//      Transient: tạo mới instance mỗi khi được inject
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  getUsers(): number | string {
    // return `This action returns all users`;
    return this.databaseService.findAll();
  }
}

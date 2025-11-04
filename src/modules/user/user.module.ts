import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  // imports: [DatabaseModule],       // import các module khác
  controllers: [UserController], // Chứa controller
  providers: [UserService, AuthService, DatabaseService], // Chứa service, repository, helper...
  exports: [UserService, AuthService], // Export để module khác có thể dùng
})
export class UserModule {}

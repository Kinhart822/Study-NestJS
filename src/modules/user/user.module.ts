import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { DatabaseService } from 'src/database/database.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // import các module khác
  controllers: [UserController], // Chứa controller
  providers: [UserService, AuthService, DatabaseService], // Chứa service, repository, helper...
  exports: [UserService, AuthService], // Export để module khác có thể dùng,
})
export class UserModule {}

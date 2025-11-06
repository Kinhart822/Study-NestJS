import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from 'src/database/database.service';
import { User } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // import các module khác
  controllers: [UserController], // Chứa controller
  providers: [UserService, DatabaseService], // Chứa service, repository, helper...
  exports: [UserService], // Export để module khác có thể dùng,
})
export class UserModule {}

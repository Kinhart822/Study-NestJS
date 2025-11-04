import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  //   @Get()
  //   index() {
  //     return [this.userService.getUsers(), this.authService.login()];
  //   }

  @Get()
  hello(@Query() query: any) {
    return {
      keyword: query.keyword || 'value',
      category: query.category || 'all',
    };
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return `This action returns a #${id} user`;
  }

  @Post()
  create() {
    return 'This action creates a new user';
  }
}

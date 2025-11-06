import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  //   @Get()
  //   index() {
  //     return [this.userService.getUsers(), this.authService.login()];
  //   }

  // @Get()
  // hello(@Query() query: any) {
  //   return {
  //     keyword: query.keyword || 'value',
  //     category: query.category || 'all',
  //   };
  // }

  // @Get()
  // hello(@Query() query: { keyword?: string; category?: string }) {
  //   return {
  //     keyword: query.keyword ?? 'value',
  //     category: query.category ?? 'all',
  //   };
  // }

  @Get(':id')
  show(@Param('id') id: string) {
    return `This action returns a #${id} user`;
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  // @Post()
  // create() {
  //   return 'This action creates a new user';
  // }

  // @Post()
  // create(@Body() body: any) {
  //   return body;
  // }

  @Post()
  create(@Body() body: any) {
    return this.userService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.userService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}

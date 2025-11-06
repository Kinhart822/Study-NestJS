import { Test, TestingModule } from '@nestjs/testing';
import { JwtUserController } from './jwt-user.controller';
import { JwtUserService } from './jwt-user.service';

describe('JwtUserController', () => {
  let controller: JwtUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JwtUserController],
      providers: [JwtUserService],
    }).compile();

    controller = module.get<JwtUserController>(JwtUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

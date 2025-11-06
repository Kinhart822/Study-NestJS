import { Test, TestingModule } from '@nestjs/testing';
import { JwtUserService } from './jwt-user.service';

describe('JwtUserService', () => {
  let service: JwtUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtUserService],
    }).compile();

    service = module.get<JwtUserService>(JwtUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

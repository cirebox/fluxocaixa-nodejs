import { Test, TestingModule } from '@nestjs/testing';
import { FindByDateService } from '../../service/find-by-date.service';

describe('FindByDateService', () => {
  let service: FindByDateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByDateService],
    }).compile();

    service = module.get<FindByDateService>(FindByDateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

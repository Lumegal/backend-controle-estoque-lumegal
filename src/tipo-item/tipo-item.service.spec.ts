import { Test, TestingModule } from '@nestjs/testing';
import { TipoItemService } from './tipo-item.service';

describe('TipoItemService', () => {
  let service: TipoItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoItemService],
    }).compile();

    service = module.get<TipoItemService>(TipoItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

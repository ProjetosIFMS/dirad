import { Test, TestingModule } from '@nestjs/testing';
import { CompletedStepService } from './completed-step.service';

describe('CompletedStepService', () => {
  let service: CompletedStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletedStepService],
    }).compile();

    service = module.get<CompletedStepService>(CompletedStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

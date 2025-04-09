import { Test, TestingModule } from '@nestjs/testing';
import { CompletedStepController } from './completed-step.controller';
import { CompletedStepService } from './completed-step.service';

describe('CompletedStepController', () => {
  let controller: CompletedStepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletedStepController],
      providers: [CompletedStepService],
    }).compile();

    controller = module.get<CompletedStepController>(CompletedStepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

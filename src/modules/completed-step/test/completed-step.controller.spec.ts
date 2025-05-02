import { Test, TestingModule } from '@nestjs/testing';
import { CompletedStepController } from '../completed-step.controller';
import { CompletedStepService } from '../completed-step.service';
import {
  CreateCompletedStepUseCase,
  DeleteCompletedStepUseCase,
  FindAllCompletedStepByOrderUseCase,
  FindAllCompletedStepUseCase,
  FindCompletedStepByIdUseCase,
  UpdateCompletedStepUseCase,
} from '../use-cases';

describe('CompletedStepController', () => {
  let controller: CompletedStepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletedStepController],
      providers: [
        CompletedStepService,
        {
          provide: CreateCompletedStepUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllCompletedStepByOrderUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllCompletedStepUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindCompletedStepByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateCompletedStepUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteCompletedStepUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CompletedStepController>(CompletedStepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

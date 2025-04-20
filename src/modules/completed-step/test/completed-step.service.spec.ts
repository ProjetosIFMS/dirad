import { Test, TestingModule } from '@nestjs/testing';
import { CompletedStepService } from '../completed-step.service';
import {
  CreateCompletedStepUseCase,
  DeleteCompletedStepUseCase,
  FindAllCompletedStepUseCase,
  FindCompletedStepByIdUseCase,
  UpdateCompletedStepUseCase,
} from '../use-cases';

describe('CompletedStepService', () => {
  let service: CompletedStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompletedStepService,
        {
          provide: CreateCompletedStepUseCase,
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

    service = module.get<CompletedStepService>(CompletedStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

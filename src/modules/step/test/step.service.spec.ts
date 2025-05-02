import { Test, TestingModule } from '@nestjs/testing';
import { StepService } from '../step.service';
import {
  CreateStepUseCase,
  DeleteStepUseCase,
  FindAllStepByOrderUseCase,
  FindAllStepsUseCase,
  FindStepByIdUseCase,
  UpdateStepUseCase,
  FindAllStepByOrderUseCase,
} from '../use-cases';
import { Status } from '../types/Status';

describe('StepService', () => {
  let service: StepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StepService,
        {
          provide: CreateStepUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllStepsUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllStepByOrderUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindStepByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateStepUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteStepUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllStepByOrderUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StepService>(StepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create use case', async () => {
    const createDto = {
      id: 'step-1',
      description: 'Test Step',
      originSectorId: 'origin-sector-1',
      destinySectorId: 'destiny-sector-1',
      estimatedCompletionDays: 5,
      status: Status.PENDING,
      order: 1,
      activityId: 'activity-1',
      modalityId: 'modality-1',
      template: 'template-1',
    };
    await service.create(createDto);
    expect(service['CreateStepUseCase'].execute).toHaveBeenCalledWith(
      createDto,
    );
  });

  it('should call findAll use case', async () => {
    await service.findAll();
    expect(service['FindAllStepsUseCase'].execute).toHaveBeenCalled();
  });

  it('should call findOne use case', async () => {
    const id = 'step-1';
    await service.findOne(id);
    expect(service['FindStepByIdUseCase'].execute).toHaveBeenCalledWith(id);
  });

  it('should call update use case', async () => {
    const id = 'step-1';
    const updateDto = {
      description: 'Updated Step',
      originSectorId: 'new-origin-sector-1',
      destinySectorId: 'new-destiny-sector-1',
      estimatedCompletionDays: 5,
      status: Status.COMPLETED,
      order: 2,
      activityId: 'activity-1',
      modalityId: 'modality-1',
      template: 'template-1',
    };
    await service.update(id, updateDto);
    expect(service['UpdateStepUseCase'].execute).toHaveBeenCalledWith(
      id,
      updateDto,
    );
  });

  it('should call remove use case', async () => {
    const id = 'step-1';
    await service.remove(id);
    expect(service['DeleteStepUseCase'].execute).toHaveBeenCalledWith(id);
  });
});

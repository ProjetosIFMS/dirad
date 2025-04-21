import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from '../activity.service';
import {
  CreateActivityUseCase,
  DeleteActivityUseCase,
  FindAllActivityUseCase,
  FindActivityByIdUseCase,
  UpdateActivityUseCase,
} from '../use-cases';

describe('ActivityService', () => {
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: CreateActivityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllActivityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindActivityByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateActivityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteActivityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create use case', async () => {
    const createDto = {
      id: 'activity-1',
      name: 'Test Activity',
      description: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await service.create(createDto);
    expect(service['CreateActivityUseCase'].execute).toHaveBeenCalledWith(
      createDto,
    );
  });

  it('should call findAll use case', async () => {
    const includeSteps = true;
    await service.findAll(includeSteps);
    expect(service['FindAllActivityUseCase'].execute).toHaveBeenCalledWith(
      includeSteps,
    );
  });

  it('should call findOne use case', async () => {
    const id = 'test-id';
    const includeSteps = true;
    await service.findOne(id, includeSteps);
    expect(service['FindActivityByIdUseCase'].execute).toHaveBeenCalledWith(
      id,
      includeSteps,
    );
  });

  it('should call update use case', async () => {
    const id = 'test-id';
    const updateDto = {
      name: 'Updated Activity',
      description: 'Updated Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await service.update(id, updateDto);
    expect(service['UpdateActivityUseCase'].execute).toHaveBeenCalledWith(
      id,
      updateDto,
    );
  });

  it('should call remove use case', async () => {
    const id = 'test-id';
    await service.remove(id);
    expect(service['DeleteActivityUseCase'].execute).toHaveBeenCalledWith(id);
  });
});

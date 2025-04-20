import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistService } from '../checklist.service';
import {
  CreateChecklistUseCase,
  DeleteChecklistUseCase,
  FindAllChecklistUseCase,
  FindChecklistByIdUseCase,
  UpdateChecklistUseCase,
} from '../use-cases';

describe('ChecklistService', () => {
  let service: ChecklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistService,
        {
          provide: CreateChecklistUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllChecklistUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindChecklistByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateChecklistUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteChecklistUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChecklistService>(ChecklistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create use case', async () => {
    const createDto = { name: 'Test Checklist', processId: 'process-1' };
    await service.create(createDto);
    expect(service['createChecklistUseCase'].execute).toHaveBeenCalledWith(
      createDto,
    );
  });

  it('should call findAll use case', async () => {
    await service.findAll();
    expect(service['findAllChecklistUseCase'].execute).toHaveBeenCalled();
  });

  it('should call findOne use case', async () => {
    const id = 'test-id';
    await service.findOne(id);
    expect(service['findChecklistByIdUseCase'].execute).toHaveBeenCalledWith(
      id,
    );
  });

  it('should call update use case', async () => {
    const id = 'test-id';
    const updateDto = { name: 'Updated Checklist', processId: 'process-1' };
    await service.update(id, updateDto);
    expect(service['updateChecklistUseCase'].execute).toHaveBeenCalledWith(
      id,
      updateDto,
    );
  });

  it('should call remove use case', async () => {
    const id = 'test-id';
    await service.remove(id);
    expect(service['deleteChecklistUseCase'].execute).toHaveBeenCalledWith(id);
  });
});
